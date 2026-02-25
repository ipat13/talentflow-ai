import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken, getAdminDb } from "./firebase-admin";
import { Role, hasPermission } from "./rbac";

interface AuthenticatedUser {
  uid: string;
  email: string;
  name?: string;
  role: Role;
}

export async function getAuthUser(req: NextRequest): Promise<AuthenticatedUser | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);
  const decodedToken = await verifyIdToken(token);
  
  if (!decodedToken) {
    return null;
  }

  const adminDb = getAdminDb();
  const userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();
  
  if (!userDoc.exists) {
    return null;
  }

  const userData = userDoc.data();
  
  return {
    uid: decodedToken.uid,
    email: decodedToken.email || "",
    name: decodedToken.name,
    role: userData?.role || "viewer",
  };
}

export function withAuth(
  handler: (req: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const user = await getAuthUser(req);
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    return handler(req, user);
  };
}

export function withPermission(
  permission: string,
  handler: (req: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>
) {
  return withAuth(async (req, user) => {
    if (!hasPermission(user.role, permission)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    return handler(req, user);
  });
}
