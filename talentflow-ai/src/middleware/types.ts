import { NextRequest, NextResponse } from "next/server";

export type MiddlewareResult = {
  response: NextResponse;
  handled: boolean;
};

export type MiddlewareHandler = (
  request: NextRequest
) => MiddlewareResult | Promise<MiddlewareResult>;

export interface MiddlewareConfig {
  matcher?: string | string[];
}
