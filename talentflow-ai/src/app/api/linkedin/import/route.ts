import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || !url.includes("linkedin.com")) {
      return NextResponse.json(
        { error: "URL do LinkedIn inválida" },
        { status: 400 }
      );
    }

    const apifyToken = process.env.APIFY_API_TOKEN;

    if (!apifyToken || apifyToken === "your-apify-token-here") {
      return NextResponse.json(
        { error: "API do LinkedIn não configurada. Contacte o administrador." },
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
    
    const candidate = {
      name: profile.fullName || profile.name || "Unknown",
      role: profile.headline || profile.title || "Professional",
      score: Math.floor(Math.random() * 30) + 70,
      linkedinUrl: url,
      location: profile.location || "",
      company: profile.companyName || "",
      experience: profile.experience || [],
      education: profile.education || [],
      skills: profile.skills || [],
    };

    return NextResponse.json({
      success: true,
      candidates: [candidate],
    });
  } catch (error) {
    console.error("LinkedIn import error:", error);
    return NextResponse.json(
      { error: "Erro ao importar do LinkedIn" },
      { status: 500 }
    );
  }
}
