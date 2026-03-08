import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ user: null });
    }

    const auth = getAdminAuth();
    
    try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie);
      
      return NextResponse.json({
        user: {
          uid: decodedClaims.uid,
          email: decodedClaims.email,
          name: decodedClaims.name || null,
          role: (decodedClaims as any).role || "user",
        },
      });
    } catch (error) {
      return NextResponse.json({ user: null });
    }
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json({ user: null });
  }
}
