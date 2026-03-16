import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, getAdminStorage } from "@/lib/firebase-admin";
import { extractTextFromPDF } from "@/services/pdf";
import { v4 as uuidv4 } from "uuid";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const jobId = formData.get("jobId") as string | null;
    const candidateName = formData.get("name") as string | null;
    const candidateEmail = formData.get("email") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!jobId) {
      return NextResponse.json({ error: "jobId is required" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large. Maximum size is 5MB" }, { status: 400 });
    }

    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    const db = getAdminDb();
    const storage = getAdminStorage();

    const candidateId = uuidv4();
    const fileName = `${candidateId}_${file.name}`;
    const bucket = storage.bucket();
    const fileRef = bucket.file(`cvs/${fileName}`);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          originalName: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    const [cvUrl] = await fileRef.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    let cvText = "";
    try {
      cvText = await extractTextFromPDF(buffer);
    } catch (error) {
      console.error("Error extracting PDF text:", error);
      cvText = "";
    }

    const name = candidateName || file.name.replace(/\.[^/.]+$/, "").split(/[-_]/).slice(0, 2).join(" ") || "Candidate";
    const email = candidateEmail || `${name.toLowerCase().replace(/\s+/g, ".")}@candidate.com`;

    const candidateData = {
      id: candidateId,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email.toLowerCase(),
      phone: "",
      cvUrl,
      cvText: cvText.substring(0, 10000),
      source: "upload",
      matchScore: null,
      matchHighlights: [],
      jobId,
      jobTitle: "",
      status: "new",
      skills: [],
      experience: "",
      education: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.collection("candidates").doc(candidateId).set(candidateData);

    return NextResponse.json({
      success: true,
      candidate: candidateData,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}