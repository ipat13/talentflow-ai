import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getAdminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, jobId } = body;

    if (!url || !url.includes("linkedin.com")) {
      return NextResponse.json(
        { error: "URL do LinkedIn inválida" },
        { status: 400 }
      );
    }

    if (!jobId) {
      return NextResponse.json(
        { error: "jobId é obrigatório" },
        { status: 400 }
      );
    }

    const apifyToken = process.env.APIFY_API_KEY;

    if (!apifyToken) {
      return NextResponse.json(
        { error: "API do LinkedIn não configurada. Configure APIFY_API_KEY no .env.local" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.apify.com/v2/acts/curious_coder~linkedin-profile-scraper/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apifyToken}`,
      },
      body: JSON.stringify({
        profileUrls: [url],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to start Apify actor");
    }

    const runData = await response.json();
    const runId = runData.data.id;

    let datasetItems: any[] = [];
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const datasetResponse = await fetch(`https://api.apify.com/v2/runs/${runId}/dataset/items`, {
        headers: {
          "Authorization": `Bearer ${apifyToken}`,
        },
      });

      if (datasetResponse.ok) {
        datasetItems = await datasetResponse.json();
        if (datasetItems.length > 0) {
          break;
        }
      }
      attempts++;
    }

    if (datasetItems.length === 0) {
      return NextResponse.json(
        { error: "Não foi possível obter os dados do LinkedIn. Tente novamente." },
        { status: 500 }
      );
    }

    const profile = datasetItems[0];
    
    const db = getAdminDb();
    const candidatesRef = db.collection("candidates");
    
    const candidateData = {
      name: profile.fullName || profile.name || "Unknown",
      email: `${profile.fullName?.toLowerCase().replace(/\s+/g, ".") || "candidate"}@linkedin.com`,
      phone: "",
      cvUrl: "",
      cvText: JSON.stringify({
        headline: profile.headline || profile.title || "",
        location: profile.location || "",
        company: profile.companyName || "",
        experience: profile.experience || [],
        education: profile.education || [],
        skills: profile.skills || [],
        summary: profile.summary || "",
      }),
      source: "linkedin",
      matchScore: null,
      matchHighlights: [],
      jobId,
      jobTitle: "",
      status: "new",
      skills: profile.skills || [],
      experience: profile.experience?.length ? `${profile.experience.length} experiências` : "",
      education: profile.education?.map((edu: any) => edu.schoolName).join(", ") || "",
      linkedinUrl: url,
      profileData: profile,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await candidatesRef.add(candidateData);

    return NextResponse.json({
      success: true,
      candidate: {
        id: docRef.id,
        ...candidateData
      },
    });
  } catch (error) {
    console.error("LinkedIn import error:", error);
    return NextResponse.json(
      { error: "Erro ao importar do LinkedIn" },
      { status: 500 }
    );
  }
}