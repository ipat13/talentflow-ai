import { NextRequest, NextResponse } from "next/server";
import { generateJobDescription } from "@/services/deepseek";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, competencies } = body;

    if (!title || !competencies || !Array.isArray(competencies) || competencies.length === 0) {
      return NextResponse.json(
        { error: "Title and competencies are required" },
        { status: 400 }
      );
    }

    const result = await generateJobDescription(title, competencies);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating description:", error);
    
    if (error instanceof Error && error.message.includes("DEEPSEEK_API_KEY")) {
      return NextResponse.json(
        { error: "DeepSeek API not configured" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 }
    );
  }
}
