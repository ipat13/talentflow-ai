import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/services/pdf";

const candidates: any[] = [];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const jobId = formData.get("jobId") as string | null;

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

    const fileName = file.name.replace(/\.[^/.]+$/, "");
    const nameParts = fileName.split(/[-_]/);
    const name = nameParts[0] + " " + nameParts[1] || "Candidate";

    let cvText = "";
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      cvText = await extractTextFromPDF(buffer);
    } catch (error) {
      console.error("Error extracting PDF text:", error);
      cvText = "";
    }

    const mockCandidate = {
      id: Date.now().toString(),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: `${name.toLowerCase().replace(" ", ".")}@email.com`,
      phone: "+351 912 345 678",
      cvUrl: `/cvs/${file.name}`,
      cvText: cvText.substring(0, 5000),
      source: "upload",
      matchScore: null,
      matchHighlights: [],
      jobId,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    candidates.push(mockCandidate);

    return NextResponse.json({
      success: true,
      candidate: mockCandidate,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
