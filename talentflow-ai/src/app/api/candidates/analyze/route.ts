import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { analyzeCV } from "@/services/deepseek";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const adminDb = getAdminDb();
    const body = await request.json();
    const { candidateId } = body;

    if (!candidateId) {
      return NextResponse.json(
        { error: "candidateId is required" },
        { status: 400 }
      );
    }

    const candidateDoc = await adminDb.collection("candidates").doc(candidateId).get();
    
    if (!candidateDoc.exists) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    const candidateData = candidateDoc.data();

    if (!candidateData?.cvText) {
      return NextResponse.json(
        { error: "No CV text available for analysis" },
        { status: 400 }
      );
    }

    const jobDoc = await adminDb.collection("jobs").doc(candidateData.jobId).get();
    
    if (!jobDoc.exists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const jobData = jobDoc.data();

    const analysis = await analyzeCV(
      candidateData.cvText,
      jobData?.description || "",
      jobData?.requirements || []
    );

    await adminDb.collection("candidates").doc(candidateId).update({
      matchScore: analysis.score,
      matchHighlights: analysis.highlights,
      analysis: {
        skillsMatch: analysis.skillsMatch,
        experience: analysis.experience,
        education: analysis.education,
        recommendation: analysis.recommendation,
        recommendationReason: analysis.recommendationReason,
      },
      updatedAt: new Date(),
    });

    return NextResponse.json({
      score: analysis.score,
      highlights: analysis.highlights,
      summary: analysis.summary,
      skillsMatch: analysis.skillsMatch,
      experience: analysis.experience,
      education: analysis.education,
      recommendation: analysis.recommendation,
      recommendationReason: analysis.recommendationReason,
    });
  } catch (error) {
    console.error("Error analyzing CV:", error);
    
    if (error instanceof Error && error.message.includes("DEEPSEEK_API_KEY")) {
      return NextResponse.json(
        { error: "DeepSeek API not configured" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to analyze CV" },
      { status: 500 }
    );
  }
}
