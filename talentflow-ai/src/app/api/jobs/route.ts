import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { Job, JobInput } from "@/types/job";

export async function GET(request: NextRequest) {
  try {
    const adminDb = getAdminDb();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const query = adminDb.collection("jobs").orderBy("createdAt", "desc");

    const snapshot = await query.get();
    const jobs: Job[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const job = {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Job;

      if (!status || job.status === status) {
        jobs.push(job);
      }
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminDb = getAdminDb();
    const body: JobInput = await request.json();

    if (!body.title || !body.department || !body.location || !body.type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const now = new Date();
    const jobData = {
      title: body.title,
      department: body.department,
      location: body.location,
      type: body.type,
      description: body.description || "",
      requirements: body.requirements || [],
      competencies: body.competencies || [],
      status: body.status || "draft",
      createdBy: "system",
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await adminDb.collection("jobs").add(jobData);

    return NextResponse.json({
      job: {
        id: docRef.id,
        ...jobData,
      },
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
