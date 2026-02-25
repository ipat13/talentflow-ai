import { NextRequest, NextResponse } from "next/server";
import { MiddlewareResult } from "./types";
import { isProtectedRoute, getRedirectUrl } from "./routes";
import { getSessionCookie, isValidSession } from "./auth-handler";

export function createRouteProtectionHandler(): (request: NextRequest) => MiddlewareResult {
  return function (request: NextRequest): MiddlewareResult {
    const { pathname } = request.nextUrl;
    const sessionCookie = getSessionCookie(request);

    if (isProtectedRoute(pathname) && !isValidSession(sessionCookie)) {
      const redirectUrl = getRedirectUrl(request.url, pathname);
      return {
        response: NextResponse.redirect(redirectUrl),
        handled: true,
      };
    }

    return {
      response: NextResponse.next(),
      handled: false,
    };
  };
}
