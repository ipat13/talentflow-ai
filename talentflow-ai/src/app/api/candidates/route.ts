import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { Candidate, CandidateInput } from "@/types/candidate";

export async function GET(request: NextRequest) {
  try {
    const adminDb = getAdminDb();
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    const query = adminDb.collection("candidates").orderBy("createdAt", "desc");
    const snapshot = await query.get();
    const candidates: Candidate[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const candidate = {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Candidate;

      if (!jobId || candidate.jobId === jobId) {
        candidates.push(candidate);
      }
    });

    return NextResponse.json({ candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminDb = getAdminDb();
    const body: CandidateInput = await request.json();

    if (!body.name || !body.email || !body.jobId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const jobDoc = await adminDb.collection("jobs").doc(body.jobId).get();
    const jobData = jobDoc.exists ? jobDoc.data() : null;

    const now = new Date();
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
      jobTitle: jobData?.title || "",
      status: body.status || "new",
      notes: body.notes || "",
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await adminDb.collection("candidates").add(candidateData);

    return NextResponse.json({
      candidate: {
        id: docRef.id,
        ...candidateData,
      },
    });
  } catch (error) {
    console.error("Error creating candidate:", error);
    return NextResponse.json(
      { error: "Failed to create candidate" },
      { status: 500 }
    );
  }
}
