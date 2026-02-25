import { NextRequest } from "next/server";
import { executeMiddlewareChain } from "./chain";
import { createRouteProtectionHandler, createAuthRedirectHandler } from "./handlers";

const middlewareHandlers = [
  createRouteProtectionHandler(),
  createAuthRedirectHandler(),
];

export async function middleware(request: NextRequest) {
  return executeMiddlewareChain(request, middlewareHandlers);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/jobs/:path*",
    "/candidates/:path*",
    "/login",
  ],
};
