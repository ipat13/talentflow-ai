import { NextRequest } from "next/server";

export function getSessionCookie(request: NextRequest): string | undefined {
  const cookie = request.cookies.get("session");
  return cookie?.value;
}

export function isValidSession(sessionCookie: string | undefined): boolean {
  if (!sessionCookie) {
    return false;
  }

  const trimmed = sessionCookie.trim();
  
  if (trimmed.length === 0) {
    return false;
  }

  return true;
}

export function validateSessionCookie(request: NextRequest): {
  isValid: boolean;
  reason?: string;
} {
  const cookie = request.cookies.get("session");

  if (!cookie) {
    return { isValid: false, reason: "Cookie not present" };
  }

  const value = cookie.value;

  if (typeof value !== "string") {
    return { isValid: false, reason: "Cookie value is not a string" };
  }

  if (value.trim().length === 0) {
    return { isValid: false, reason: "Cookie value is empty" };
  }

  return { isValid: true };
}
