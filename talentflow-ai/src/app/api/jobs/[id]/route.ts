import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const db = getAdminDb();
    const jobSnap = await db.collection("jobs").doc(id).get();
    
    if (!jobSnap.exists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    const candidatesSnapshot = await db.collection("candidates").where("jobId", "==", id).get();
    
    const jobData = jobSnap.data() || {};
    const job = {
      id: jobSnap.id,
      ...jobData,
      _count: {
        candidates: candidatesSnapshot.size
      }
    };
    
    return NextResponse.json({ job });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const db = getAdminDb();
    const jobSnap = await db.collection("jobs").doc(id).get();
    
    if (!jobSnap.exists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    const body = await request.json();
    
    const updateData = {
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await db.collection("jobs").doc(id).update(updateData);
    
    const updatedJobSnap = await db.collection("jobs").doc(id).get();
    const updatedJob = {
      id: updatedJobSnap.id,
      ...updatedJobSnap.data()
    };
    
    return NextResponse.json({ job: updatedJob });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const db = getAdminDb();
    const jobSnap = await db.collection("jobs").doc(id).get();
    
    if (!jobSnap.exists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    const candidatesSnapshot = await db.collection("candidates").where("jobId", "==", id).get();
    
    const batch = db.batch();
    batch.delete(db.collection("jobs").doc(id));
    
    candidatesSnapshot.docs.forEach(candidateDoc => {
      batch.delete(candidateDoc.ref);
    });
    
    await batch.commit();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}