import { NextRequest, NextResponse } from "next/server";
import { Candidate, CandidateInput } from "@/types/candidate";

const candidates: Candidate[] = [
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

let candidateIdCounter = 4;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const jobId = searchParams.get("jobId");
  const status = searchParams.get("status");

  let filtered = [...candidates];

  if (jobId && jobId !== "all") {
    filtered = filtered.filter((c) => c.jobId === jobId);
  }

  if (status && status !== "all") {
    filtered = filtered.filter((c) => c.status === status);
  }

  filtered.sort((a, b) => {
    if (a.matchScore === null || a.matchScore === undefined) return 1;
    if (b.matchScore === null || b.matchScore === undefined) return -1;
    return b.matchScore - a.matchScore;
  });

  return NextResponse.json({ candidates: filtered });
}

export async function POST(request: NextRequest) {
  try {
    const body: CandidateInput = await request.json();

    const newCandidate: Candidate = {
      id: (candidateIdCounter++).toString(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      cvUrl: body.cvUrl || "",
      cvText: body.cvText,
      source: body.source || "manual",
      matchScore: undefined,
      matchHighlights: [],
      jobId: body.jobId,
      status: body.status || "new",
      notes: body.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    candidates.push(newCandidate);
    return NextResponse.json({ candidate: newCandidate }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
