import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const { name, url, value, id } = data;
    
    if (!name || !url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log analytics event
    console.log("Analytics event:", {
      name,
      url,
      value: value || 0,
      id: id || "unknown",
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
    });

    // Here you could send to:
    // - Google Analytics Measurement Protocol
    // - Plausible Analytics
    // - Custom analytics database

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to log analytics" },
      { status: 500 }
    );
  }
}
