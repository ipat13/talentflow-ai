import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");

    const db = getAdminDb();
    let jobsQuery: any = db.collection("jobs").orderBy("createdAt", "desc");

    if (status && status !== "all") {
      jobsQuery = jobsQuery.where("status", "==", status);
    }

    const snapshot = await jobsQuery.get();
    const jobs = await Promise.all(snapshot.docs.map(async (doc: any) => {
      const jobData = doc.data();
      
      const candidatesSnapshot = await db.collection("candidates")
        .where("jobId", "==", doc.id)
        .get();
      
      return {
        id: doc.id,
        ...jobData,
        _count: {
          candidates: candidatesSnapshot.size
        }
      };
    }));

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.company) {
      return NextResponse.json({ error: "Title and company are required" }, { status: 400 });
    }

    const db = getAdminDb();
    const jobsRef = db.collection("jobs");

    const jobData = {
      title: body.title,
      department: body.department || "",
      company: body.company,
      location: body.location || "",
      type: body.type || "full-time",
      salary: body.salary || "",
      description: body.description || "",
      requirements: body.requirements || [],
      competencies: body.competencies || [],
      skills: body.skills || [],
      status: body.status || "draft",
      createdBy: body.createdBy || "system",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await jobsRef.add(jobData);

    return NextResponse.json({ 
      job: {
        id: docRef.id,
        ...jobData,
        _count: { candidates: 0 }
      }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}