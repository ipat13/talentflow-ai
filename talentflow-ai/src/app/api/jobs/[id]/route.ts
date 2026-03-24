import { NextRequest, NextResponse } from "next/server";
import { JobInput } from "@/types/job";

const jobs: any[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    company: "Tech Corp",
    location: "Remote",
    type: "full-time",
    salary: "€60k - €80k",
    description: "We are looking for a Senior Frontend Engineer...",
    requirements: ["React", "TypeScript", "Node.js"],
    competencies: ["Leadership", "Communication"],
    status: "active",
    createdBy: "user@example.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: { candidates: 12 },
  },
  {
    id: "2",
    title: "Data Scientist",
    department: "Data",
    company: "DataTech",
    location: "Lisbon, PT",
    type: "full-time",
    salary: "€50k - €70k",
    description: "Join our data science team...",
    requirements: ["Python", "Machine Learning", "SQL"],
    competencies: ["Analytics", "Problem Solving"],
    status: "active",
    createdBy: "user@example.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: { candidates: 8 },
  },
  {
    id: "3",
    title: "Product Designer",
    department: "Design",
    company: "DesignStudio",
    location: "Remote",
    type: "contract",
    salary: "€40k - €60k",
    description: "Create amazing user experiences...",
    requirements: ["Figma", "UI/UX", "Prototyping"],
    competencies: ["Creativity", "User Research"],
    status: "draft",
    createdBy: "user@example.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: { candidates: 5 },
  },
];

let jobIdCounter = 4;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);
  
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  
  return NextResponse.json({ job });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const jobIndex = jobs.findIndex((j) => j.id === id);
  
  if (jobIndex === -1) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  
  try {
    const body: JobInput = await request.json();
    
    jobs[jobIndex] = {
      ...jobs[jobIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ job: jobs[jobIndex] });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const jobIndex = jobs.findIndex((j) => j.id === id);
  
  if (jobIndex === -1) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  
  jobs.splice(jobIndex, 1);
  return NextResponse.json({ success: true });
}
