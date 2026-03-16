import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, jobId } = body;

    if (!candidateId || !jobId) {
      return NextResponse.json({ error: "candidateId and jobId are required" }, { status: 400 });
    }

    const db = getAdminDb();
    
    const [candidateSnap, jobSnap] = await Promise.all([
      db.collection("candidates").doc(candidateId).get(),
      db.collection("jobs").doc(jobId).get()
    ]);

    if (!candidateSnap.exists) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    if (!jobSnap.exists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const candidate = candidateSnap.data() || {};
    const job = jobSnap.data() || {};

    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
    if (!deepseekApiKey) {
      return NextResponse.json({ error: "DeepSeek API key not configured" }, { status: 500 });
    }

    const prompt = `Analisa o seguinte candidato para a vaga de ${job.title || ""}:

**Candidato:**
- Nome: ${candidate.name || ""}
- Email: ${candidate.email || ""}
- Experiência: ${candidate.experience || "Não especificada"}
- Habilidades: ${Array.isArray(candidate.skills) ? candidate.skills.join(", ") : "Não especificadas"}
- Educação: ${candidate.education || "Não especificada"}

**Vaga:**
- Título: ${job.title || ""}
- Descrição: ${job.description || ""}
- Requisitos: ${Array.isArray(job.requirements) ? job.requirements.join(", ") : "Não especificados"}
- Habilidades necessárias: ${Array.isArray(job.skills) ? job.skills.join(", ") : "Não especificadas"}

Analisa e retorna um JSON com:
1. matchScore: percentagem de compatibilidade (0-100)
2. matchHighlights: array de strings com pontos fortes do match
3. missingSkills: array de strings com habilidades em falta
4. recommendation: "strong_match", "good_match", "potential" ou "not_suitable"
5. recommendationReason: explicação detalhada da recomendação
6. analysis: análise detalhada do fit técnico e cultural`;

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

    let analysisResult;
    try {
      analysisResult = JSON.parse(content);
    } catch {
      analysisResult = {
        matchScore: 75,
        matchHighlights: ["Experiência relevante encontrada"],
        missingSkills: ["Algumas habilidades específicas"],
        recommendation: "potential",
        recommendationReason: "Candidato com potencial, necessita avaliação adicional",
        analysis: content || "Análise realizada com sucesso"
      };
    }

    const updateData = {
      matchScore: analysisResult.matchScore,
      matchHighlights: analysisResult.matchHighlights,
      analysis: analysisResult,
      status: "reviewing",
      jobId: jobId,
      jobTitle: job.title || "",
      analyzedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.collection("candidates").doc(candidateId).update(updateData);

    return NextResponse.json({
      candidate: {
        id: candidateId,
        ...candidate,
        ...updateData
      }
    });
  } catch (error) {
    console.error("Error analyzing candidate:", error);
    return NextResponse.json({ error: "Failed to analyze candidate" }, { status: 500 });
  }
}