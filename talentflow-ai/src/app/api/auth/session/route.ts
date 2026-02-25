import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { Role } from "@/lib/rbac";

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "No ID token provided" }, { status: 400 });
    }

    const decodedToken = await verifyIdToken(idToken);
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const adminAuth = getAdminAuth();
    const adminDb = getAdminDb();

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    let userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();

    if (!userDoc.exists) {
      await adminDb.collection("users").doc(decodedToken.uid).set({
        email: decodedToken.email,
        name: decodedToken.name || "",
        role: "viewer" as Role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();
    }

    const userData = userDoc.data();

    const response = NextResponse.json({
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
        role: userData?.role || "viewer",
      },
    });

    response.cookies.set("session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("session");
  return response;
}
