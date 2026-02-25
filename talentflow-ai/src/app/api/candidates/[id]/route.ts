import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, getAdminStorage } from "@/lib/firebase-admin";
import { CandidateInput } from "@/types/candidate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminDb = getAdminDb();
    const { id } = await params;

    const doc = await adminDb.collection("candidates").doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    const data = doc.data();
    const candidate = {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt?.toDate?.() || data?.createdAt,
      updatedAt: data?.updatedAt?.toDate?.() || data?.updatedAt,
    };

    return NextResponse.json({ candidate });
  } catch (error) {
    console.error("Error fetching candidate:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidate" },
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
    const body: Partial<CandidateInput> = await request.json();

    const docRef = adminDb.collection("candidates").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    await docRef.update(updateData);

    const updatedDoc = await docRef.get();
    const data = updatedDoc.data();

    return NextResponse.json({
      candidate: {
        id: updatedDoc.id,
        ...data,
        createdAt: data?.createdAt?.toDate?.() || data?.createdAt,
        updatedAt: data?.updatedAt?.toDate?.() || data?.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating candidate:", error);
    return NextResponse.json(
      { error: "Failed to update candidate" },
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
    const adminStorage = getAdminStorage();
    const { id } = await params;

    const docRef = adminDb.collection("candidates").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    const data = doc.data();
    
    if (data?.cvUrl) {
      try {
        const bucket = adminStorage.bucket();
        const filePath = data.cvUrl.split("/").pop()?.split("?")[0];
        if (filePath) {
          await bucket.file(`cvs/${filePath}`).delete();
        }
      } catch (storageError) {
        console.error("Error deleting CV file:", storageError);
      }
    }

    await docRef.delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    return NextResponse.json(
      { error: "Failed to delete candidate" },
      { status: 500 }
    );
  }
}
