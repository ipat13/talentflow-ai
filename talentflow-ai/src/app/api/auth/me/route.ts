import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const adminAuth = getAdminAuth();
    const adminDb = getAdminDb();

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    
    const userDoc = await adminDb.collection("users").doc(decodedClaims.uid).get();
    const userData = userDoc.data();
    
    return NextResponse.json({
      user: {
        uid: decodedClaims.uid,
        email: decodedClaims.email,
        name: decodedClaims.name || userData?.name,
        role: userData?.role || "viewer",
      },
    });
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
