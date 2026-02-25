import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminDb = getAdminDb();
    const { id } = await params;

    const doc = await adminDb.collection("potential_candidates").doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Potential candidate not found" },
        { status: 404 }
      );
    }

    const data = doc.data();
    const candidate = {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt?.toDate?.() || data?.createdAt,
    };

    return NextResponse.json({ candidate });
  } catch (error) {
    console.error("Error fetching potential candidate:", error);
    return NextResponse.json(
      { error: "Failed to fetch potential candidate" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminDb = getAdminDb();
    const { id } = await params;

    const docRef = adminDb.collection("potential_candidates").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Potential candidate not found" },
        { status: 404 }
      );
    }

    await docRef.delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting potential candidate:", error);
    return NextResponse.json(
      { error: "Failed to delete potential candidate" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminDb = getAdminDb();
    const { id } = await params;
    const body = await request.json();
    const { convertToCandidate, jobId } = body;

    if (convertToCandidate) {
      return convertPotentialToCandidate(adminDb, id, jobId);
    }

    const docRef = adminDb.collection("potential_candidates").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Potential candidate not found" },
        { status: 404 }
      );
    }

    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    await docRef.update(updateData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating potential candidate:", error);
    return NextResponse.json(
      { error: "Failed to update potential candidate" },
      { status: 500 }
    );
  }
}

async function convertPotentialToCandidate(
  adminDb: ReturnType<typeof getAdminDb>,
  potentialId: string,
  jobId?: string
) {
  const potentialDoc = await adminDb
    .collection("potential_candidates")
    .doc(potentialId)
    .get();

  if (!potentialDoc.exists) {
    return NextResponse.json(
      { error: "Potential candidate not found" },
      { status: 404 }
    );
  }

  const potentialData = potentialDoc.data();
  const targetJobId = jobId || potentialData?.jobId;

  if (!targetJobId) {
    return NextResponse.json(
      { error: "No job specified for candidate" },
      { status: 400 }
    );
  }

  const jobDoc = await adminDb.collection("jobs").doc(targetJobId).get();
  const jobData = jobDoc.exists ? jobDoc.data() : null;

  const now = new Date();
  const candidateData = {
    name: potentialData?.name || "Unknown",
    email: "",
    phone: "",
    cvUrl: "",
    source: "linkedin" as const,
    jobId: targetJobId,
    jobTitle: jobData?.title || "",
    status: "new" as const,
    notes: `Imported from LinkedIn: ${potentialData?.linkedInUrl}\n\n${potentialData?.summary || ""}`,
    matchScore: null,
    matchHighlights: potentialData?.skills?.slice(0, 3) || [],
    createdAt: now,
    updatedAt: now,
  };

  const candidateRef = await adminDb.collection("candidates").add(candidateData);

  await adminDb.collection("potential_candidates").doc(potentialId).delete();

  return NextResponse.json({
    candidate: {
      id: candidateRef.id,
      ...candidateData,
    },
  });
}
