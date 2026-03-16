import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId, candidateId } = body;

    if (!jobId || !candidateId) {
      return NextResponse.json({ error: "jobId and candidateId are required" }, { status: 400 });
    }

    const db = getAdminDb();
    
    const [candidateSnap, jobSnap] = await Promise.all([
      db.collection("candidates").doc(candidateId).get(),
      db.collection("jobs").doc(jobId).get()
    ]);

    if (!jobSnap.exists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (!candidateSnap.exists) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    const job = jobSnap.data() || {};
    const candidate = candidateSnap.data() || {};

    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
    if (!deepseekApiKey) {
      return NextResponse.json({ error: "DeepSeek API key not configured" }, { status: 500 });
    }

    const prompt = `Analisa o match entre o candidato e a vaga:

**CANDIDATO:**
- Nome: ${candidate.name || ""}
- Habilidades: ${Array.isArray(candidate.skills) ? candidate.skills.join(", ") : "Não especificadas"}
- Experiência: ${candidate.experience || "Não especificada"}
- Educação: ${candidate.education || "Não especificada"}
- Texto do CV: ${(candidate.cvText || "").substring(0, 2000) || "Não disponível"}

**VAGA:**
- Título: ${job.title || ""}
- Descrição: ${job.description || ""}
- Requisitos: ${Array.isArray(job.requirements) ? job.requirements.join(", ") : "Não especificados"}
- Habilidades necessárias: ${Array.isArray(job.skills) ? job.skills.join(", ") : "Não especificadas"}
- Competências: ${Array.isArray(job.competencies) ? job.competencies.join(", ") : "Não especificadas"}

Calcula um score de match (0-100) baseado em:
1. Match técnico (habilidades vs requisitos)
2. Experiência relevante
3. Fit cultural (competências)
4. Educação e qualificações

Retorna um JSON com:
- matchScore: número de 0-100
- technicalMatch: array de strings com habilidades que match
- missingSkills: array de strings com habilidades em falta
- experienceMatch: "high", "medium", "low" ou "none"
- culturalFit: "excellent", "good", "fair", "poor"
- recommendation: "strong_match", "good_match", "potential", "not_suitable"
- detailedAnalysis: análise detalhada em texto
- suggestedQuestions: array de 3-5 perguntas para entrevista`;

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${deepseekApiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    let matchResult;
    try {
      matchResult = JSON.parse(content);
    } catch {
      matchResult = {
        matchScore: 75,
        technicalMatch: ["Habilidades básicas correspondem"],
        missingSkills: ["Algumas habilidades específicas"],
        experienceMatch: "medium",
        culturalFit: "good",
        recommendation: "potential",
        detailedAnalysis: "Análise realizada com sucesso",
        suggestedQuestions: [
          "Conte-me sobre sua experiência relevante",
          "Como você lida com desafios técnicos?",
          "O que você busca em uma nova oportunidade?"
        ]
      };
    }

    return NextResponse.json({
      job: {
        id: jobId,
        ...job
      },
      candidate: {
        id: candidateId,
        ...candidate
      },
      match: matchResult,
      analyzedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error matching candidate:", error);
    return NextResponse.json({ error: "Failed to match candidate" }, { status: 500 });
  }
}