import { NextRequest, NextResponse } from "next/server";

const MOCK_MODE = true;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { linkedInUrl, jobId } = body;

    if (!linkedInUrl) {
      return NextResponse.json({ error: "LinkedIn URL is required" }, { status: 400 });
    }

    if (!linkedInUrl.includes("linkedin.com/in/")) {
      return NextResponse.json({ error: "Invalid LinkedIn profile URL" }, { status: 400 });
    }

    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const profileId = linkedInUrl.split("linkedin.com/in/")[1]?.split("/")[0]?.replace(/-/g, " ") || "candidate";
      const name = profileId.split("-").map((part: string) => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(" ") || "Candidato";

      const mockProfiles = [
        {
          id: Date.now().toString(),
          name,
          linkedInUrl,
          headline: "Senior Software Engineer | React & Node.js Expert",
          location: "Lisbon, Portugal",
          company: "Tech Innovations Ltd",
          summary: "Experienced software engineer with 8+ years in web development. Passionate about building scalable applications and mentoring junior developers.",
          skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker"],
          source: "linkedin",
          jobId: jobId || null,
          createdAt: new Date(),
        },
        {
          id: (Date.now() + 1).toString(),
          name: name.replace("Candidate", "Professional"),
          linkedInUrl: linkedInUrl.replace("candidate", "professional"),
          headline: "Product Manager | Tech Enthusiast",
          location: "Remote",
          company: "Digital Solutions",
          summary: "Product manager with experience in agile methodologies and data-driven decision making.",
          skills: ["Product Management", "Agile", "Scrum", "Data Analytics", "UX Research"],
          source: "linkedin",
          jobId: jobId || null,
          createdAt: new Date(),
        },
      ];

      return NextResponse.json({
        success: true,
        candidates: mockProfiles,
      });
    }

    const apifyApiKey = process.env.APIFY_API_KEY;
    if (!apifyApiKey) {
      return NextResponse.json({ error: "Apify API key not configured" }, { status: 500 });
    }

    const response = await fetch("https://api.apify.com/v2/acts/apify~linkedin-profile-scraper/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apifyApiKey}`,
      },
      body: JSON.stringify({
        profiles: [linkedInUrl],
      }),
    });

    if (!response.ok) {
      throw new Error(`Apify API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      candidates: data,
    });
  } catch (error) {
    console.error("Error scraping LinkedIn:", error);
    return NextResponse.json({ error: "Failed to scrape LinkedIn profile" }, { status: 500 });
  }
}
