import { NextRequest, NextResponse } from "next/server";
import { isProtectedRoute, isAuthRoute, getRedirectUrl } from "./routes";
import { validateSessionCookie } from "./session-validator";

export interface AuthResult {
  response: NextResponse;
  isAuthenticated: boolean;
}

export function handleAuth(request: NextRequest): AuthResult {
  const { pathname } = request.nextUrl;
  const sessionValidation = validateSessionCookie(request);
  const authenticated = sessionValidation.isValid;

  if (isProtectedRoute(pathname) && !authenticated) {
    const redirectUrl = getRedirectUrl(request.url, pathname);
    return {
      response: NextResponse.redirect(redirectUrl),
      isAuthenticated: false,
    };
  }

  if (isAuthRoute(pathname) && authenticated) {
    if (isRedirectLoop(pathname, request)) {
      return {
        response: NextResponse.next(),
        isAuthenticated: true,
      };
    }
    return {
      response: NextResponse.redirect(new URL("/dashboard", request.url)),
      isAuthenticated: true,
    };
  }

  return {
    response: NextResponse.next(),
    isAuthenticated: authenticated,
  };
}

function isRedirectLoop(pathname: string, request: NextRequest): boolean {
  const referer = request.headers.get("referer");
  if (!referer) {
    return false;
  }

  try {
    const refererUrl = new URL(referer);
    if (refererUrl.pathname === pathname) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}
