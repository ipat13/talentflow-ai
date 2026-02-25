import { NextRequest, NextResponse } from "next/server";
import { MiddlewareResult } from "./types";
import { isAuthRoute } from "./routes";
import { getSessionCookie, isValidSession } from "./auth-handler";

export function createAuthRedirectHandler(): (request: NextRequest) => MiddlewareResult {
  return function (request: NextRequest): MiddlewareResult {
    const { pathname } = request.nextUrl;
    const sessionCookie = getSessionCookie(request);

    if (isAuthRoute(pathname) && isValidSession(sessionCookie)) {
      return {
        response: NextResponse.redirect(new URL("/dashboard", request.url)),
        handled: true,
      };
    }

    return {
      response: NextResponse.next(),
      handled: false,
    };
  };
}
