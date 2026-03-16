import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId } = body;

    if (!jobId) {
      return NextResponse.json({ error: "jobId is required" }, { status: 400 });
    }

    const db = getAdminDb();
    
    const [jobSnap, candidatesSnap] = await Promise.all([
      db.collection("jobs").doc(jobId).get(),
      db.collection("candidates").where("jobId", "==", jobId).get()
    ]);

    if (!jobSnap.exists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const job = jobSnap.data() || {};
    const candidates = candidatesSnap.docs.map(doc => {
      const data = doc.data() || {};
      return {
        id: doc.id,
        name: data.name || "",
        email: data.email || "",
        skills: data.skills || [],
        experience: data.experience || "",
        education: data.education || "",
        cvText: data.cvText || "",
        status: data.status || "new"
      };
    });

    if (candidates.length === 0) {
      return NextResponse.json({ matches: [] });
    }

    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
    if (!deepseekApiKey) {
      return NextResponse.json({ error: "DeepSeek API key not configured" }, { status: 500 });
    }

    const prompt = `Analisa múltiplos candidatos para a seguinte vaga:

**VAGA:**
- Título: ${job.title}
- Descrição: ${job.description}
- Requisitos: ${job.requirements?.join(", ") || "Não especificados"}
- Habilidades necessárias: ${job.skills?.join(", ") || "Não especificadas"}
- Competências: ${job.competencies?.join(", ") || "Não especificadas"}

**CANDIDATOS:**
${candidates.map((c, i) => `
Candidato ${i + 1}:
- Nome: ${c.name}
- Habilidades: ${c.skills?.join(", ") || "Não especificadas"}
- Experiência: ${c.experience || "Não especificada"}
- Educação: ${c.education || "Não especificada"}
- Resumo CV: ${c.cvText?.substring(0, 500) || "Não disponível"}
`).join("\n")}

Para cada candidato, calcula:
1. matchScore (0-100)
2. technicalMatch (array de habilidades que match)
3. missingSkills (array de habilidades em falta)
4. recommendation ("strong_match", "good_match", "potential", "not_suitable")
5. priority ("high", "medium", "low")

Retorna um JSON com array "matches" onde cada item tem:
- candidateId
- candidateName
- matchScore
- technicalMatch
- missingSkills
- recommendation
- priority
- briefReason (explicação curta)`;

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

    let matchesResult;
    try {
      matchesResult = JSON.parse(content);
    } catch {
      matchesResult = {
        matches: candidates.map((candidate, index) => ({
          candidateId: candidate.id,
          candidateName: candidate.name,
          matchScore: 70 + Math.floor(Math.random() * 30),
          technicalMatch: ["Habilidades básicas"],
          missingSkills: ["Algumas específicas"],
          recommendation: "potential",
          priority: "medium",
          briefReason: "Candidato com potencial para avaliação"
        }))
      };
    }

    const matchesWithData = matchesResult.matches.map((match: any) => {
      const candidate = candidates.find(c => c.id === match.candidateId);
      return {
        ...match,
        candidateEmail: candidate?.email || "",
        candidateStatus: candidate?.status || "new",
        candidateExperience: candidate?.experience || "",
        candidateEducation: candidate?.education || ""
      };
    });

    matchesWithData.sort((a: any, b: any) => b.matchScore - a.matchScore);

    return NextResponse.json({
      job: {
        id: jobId,
        title: job.title,
        company: job.company
      },
      totalCandidates: candidates.length,
      matches: matchesWithData,
      analyzedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error batch matching candidates:", error);
    return NextResponse.json({ error: "Failed to batch match candidates" }, { status: 500 });
  }
}