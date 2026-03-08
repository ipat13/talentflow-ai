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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const candidateIndex = candidates.findIndex((c) => c.id === id);

  if (candidateIndex === -1) {
    return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
  }

  candidates.splice(candidateIndex, 1);
  return NextResponse.json({ success: true });
}
