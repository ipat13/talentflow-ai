import { NextRequest, NextResponse } from "next/server";
import { Job, JobInput } from "@/types/job";

const jobs: Job[] = [
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
    createdAt: new Date(),
    updatedAt: new Date(),
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
    createdAt: new Date(),
    updatedAt: new Date(),
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
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { candidates: 5 },
  },
];

let jobIdCounter = 4;

export async function GET() {
  return NextResponse.json({ jobs });
}

export async function POST(request: NextRequest) {
  try {
    const body: JobInput = await request.json();
    
    const newJob: Job = {
      id: (jobIdCounter++).toString(),
      title: body.title,
      department: body.department || "",
      company: body.company,
      location: body.location || "",
      type: body.type || "full-time",
      salary: body.salary || "",
      description: body.description || "",
      requirements: body.requirements || [],
      competencies: body.competencies || [],
      status: body.status || "active",
      createdBy: "user@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      _count: { candidates: 0 },
    };

    jobs.push(newJob);
    return NextResponse.json({ job: newJob }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
