import { NextRequest, NextResponse } from "next/server";
import { getAdminStorage, getAdminDb } from "@/lib/firebase-admin";
import { extractTextFromPDF } from "@/services/pdf";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const adminStorage = getAdminStorage();
    const adminDb = getAdminDb();
    
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const jobId = formData.get("jobId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!jobId) {
      return NextResponse.json({ error: "No jobId provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are supported" }, { status: 400 });
    }

    const jobDoc = await adminDb.collection("jobs").doc(jobId).get();
    if (!jobDoc.exists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    const jobData = jobDoc.data();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const bucket = adminStorage.bucket();
    const fileRef = bucket.file(`cvs/${fileName}`);

    await fileRef.save(buffer, {
      contentType: "application/pdf",
      metadata: {
        originalName: file.name,
        jobId,
      },
    });

    const [url] = await fileRef.getSignedUrl({
      action: "read",
      expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
    });

    let cvText = "";
    try {
      cvText = await extractTextFromPDF(buffer);
    } catch (pdfError) {
      console.error("Could not extract text from PDF:", pdfError);
    }

    const now = new Date();
    const candidateData = {
      name: extractNameFromText(cvText) || file.name.replace(".pdf", ""),
      email: extractEmailFromText(cvText) || "",
      phone: extractPhoneFromText(cvText) || "",
      cvUrl: url,
      cvText,
      source: "upload",
      matchScore: null,
      matchHighlights: [],
      jobId,
      jobTitle: jobData?.title || "",
      status: "new",
      notes: "",
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
    console.error("Error uploading CV:", error);
    return NextResponse.json(
      { error: "Failed to upload CV" },
      { status: 500 }
    );
  }
}

function extractNameFromText(text: string): string | null {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine.length > 2 && firstLine.length < 50 && /^[A-Za-z\s]+$/.test(firstLine)) {
      return firstLine;
    }
  }
  return null;
}

function extractEmailFromText(text: string): string | null {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : null;
}

function extractPhoneFromText(text: string): string | null {
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{3,4}/;
  const match = text.match(phoneRegex);
  return match ? match[0] : null;
}
