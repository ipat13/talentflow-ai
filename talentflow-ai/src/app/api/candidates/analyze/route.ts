import { NextRequest, NextResponse } from "next/server";

const candidates: any[] = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "+351 912 345 678",
    cvUrl: "/cvs/ana-silva.pdf",
    source: "upload",
    matchScore: 94,
    matchHighlights: ["React", "TypeScript", "Node.js"],
    jobId: "1",
    jobTitle: "Senior Frontend Engineer",
    status: "interview",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao.santos@email.com",
    phone: "+351 912 345 679",
    cvUrl: "/cvs/joao-santos.pdf",
    source: "upload",
    matchScore: 91,
    matchHighlights: ["Product Management", "Agile", "Analytics"],
    jobId: "2",
    jobTitle: "Data Scientist",
    status: "reviewing",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Maria Costa",
    email: "maria.costa@email.com",
    cvUrl: "/cvs/maria-costa.pdf",
    source: "linkedin",
    matchScore: 88,
    matchHighlights: ["Figma", "UI/UX", "Prototyping"],
    jobId: "3",
    jobTitle: "Product Designer",
    status: "new",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId } = body;

    if (!candidateId) {
      return NextResponse.json({ error: "candidateId is required" }, { status: 400 });
    }

    const candidateIndex = candidates.findIndex((c) => c.id === candidateId);

    if (candidateIndex === -1) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockScores = [75, 82, 88, 91, 94, 96];
    const newScore = mockScores[Math.floor(Math.random() * mockScores.length)];

    const skillsMatch = {
      matched: ["JavaScript", "React", "TypeScript"],
      missing: ["GraphQL"],
    };

    candidates[candidateIndex] = {
      ...candidates[candidateIndex],
      matchScore: newScore,
      matchHighlights: skillsMatch.matched,
      analysis: {
        skillsMatch,
        experience: {
          yearsFound: 5,
          relevantRoles: ["Senior Developer", "Tech Lead"],
        },
        education: {
          level: "Master's",
          field: "Computer Science",
        },
        recommendation: newScore >= 90 ? "strong_match" : newScore >= 80 ? "good_match" : "potential",
        recommendationReason: `Candidato com ${newScore}% de compatibilidade. Experiência relevante encontrada.`,
      },
      status: "reviewing",
      updatedAt: new Date(),
    };

    return NextResponse.json({ candidate: candidates[candidateIndex] });
  } catch (error) {
    console.error("Error analyzing candidate:", error);
    return NextResponse.json({ error: "Failed to analyze candidate" }, { status: 500 });
  }
}
