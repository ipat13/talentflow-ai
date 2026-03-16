import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const jobId = searchParams.get("jobId");
    const status = searchParams.get("status");

    const db = getAdminDb();
    
    let candidatesQuery: any = db.collection("candidates");

    if (jobId && jobId !== "all") {
      candidatesQuery = candidatesQuery.where("jobId", "==", jobId);
    }

    if (status && status !== "all") {
      candidatesQuery = candidatesQuery.where("status", "==", status);
    }

    candidatesQuery = candidatesQuery.orderBy("createdAt", "desc");

    const snapshot = await candidatesQuery.get();
    const candidates = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));

    candidates.sort((a: any, b: any) => {
      if (a.matchScore === null || a.matchScore === undefined) return 1;
      if (b.matchScore === null || b.matchScore === undefined) return -1;
      return b.matchScore - a.matchScore;
    });

    return NextResponse.json({ candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.jobId) {
      return NextResponse.json({ error: "Name, email and jobId are required" }, { status: 400 });
    }

    const db = getAdminDb();

    const candidateData = {
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      cvUrl: body.cvUrl || "",
      cvText: body.cvText || "",
      source: body.source || "manual",
      matchScore: null,
      matchHighlights: [],
      jobId: body.jobId,
      jobTitle: body.jobTitle || "",
      status: body.status || "new",
      skills: body.skills || [],
      experience: body.experience || "",
      education: body.education || "",
      notes: body.notes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection("candidates").add(candidateData);

    return NextResponse.json({ 
      candidate: {
        id: docRef.id,
        ...candidateData
      }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating candidate:", error);
    return NextResponse.json({ error: "Failed to create candidate" }, { status: 500 });
  }
}