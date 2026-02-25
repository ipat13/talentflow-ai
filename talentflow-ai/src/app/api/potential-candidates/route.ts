import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import {
  scrapeLinkedInProfile,
  isValidLinkedInUrl,
  configureScraper,
} from "@/services/openclaw";
import { PotentialCandidate } from "@/types/candidate";

configureScraper({
  apiKey: process.env.SCRAPER_API_KEY,
  apiUrl: process.env.SCRAPER_API_URL,
});

export async function GET(request: NextRequest) {
  try {
    const adminDb = getAdminDb();
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    const query = adminDb.collection("potential_candidates").orderBy("createdAt", "desc");

    const snapshot = await query.get();

    let candidates = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
    })) as PotentialCandidate[];

    if (jobId) {
      candidates = candidates.filter((c) => c.jobId === jobId);
    }

    return NextResponse.json({ candidates });
  } catch (error) {
    console.error("Error fetching potential candidates:", error);
    return NextResponse.json(
      { error: "Failed to fetch potential candidates" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminDb = getAdminDb();
    const body = await request.json();
    const { linkedInUrl, jobId } = body;

    if (!linkedInUrl) {
      return NextResponse.json(
        { error: "LinkedIn URL is required" },
        { status: 400 }
      );
    }

    if (!isValidLinkedInUrl(linkedInUrl)) {
      return NextResponse.json(
        { error: "Invalid LinkedIn URL format" },
        { status: 400 }
      );
    }

    const existingDoc = await adminDb
      .collection("potential_candidates")
      .where("linkedInUrl", "==", linkedInUrl)
      .limit(1)
      .get();

    if (!existingDoc.empty) {
      return NextResponse.json(
        { error: "This LinkedIn profile has already been added" },
        { status: 409 }
      );
    }

    let jobTitle: string | undefined;
    if (jobId) {
      const jobDoc = await adminDb.collection("jobs").doc(jobId).get();
      if (jobDoc.exists) {
        jobTitle = jobDoc.data()?.title;
      }
    }

    const profile = await scrapeLinkedInProfile(linkedInUrl);

    const candidateData: Omit<PotentialCandidate, "id"> = {
      name: profile.name,
      linkedInUrl: profile.linkedInUrl,
      headline: profile.headline,
      location: profile.location,
      company: profile.company,
      summary: profile.summary,
      skills: profile.skills,
      source: "linkedin",
      jobId,
      jobTitle,
      createdAt: new Date(),
    };

    const docRef = await adminDb.collection("potential_candidates").add(candidateData);

    return NextResponse.json({
      candidate: {
        id: docRef.id,
        ...candidateData,
      },
    });
  } catch (error) {
    console.error("Error creating potential candidate:", error);
    return NextResponse.json(
      { error: "Failed to create potential candidate" },
      { status: 500 }
    );
  }
}
