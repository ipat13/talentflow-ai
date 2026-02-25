import { NextRequest, NextResponse } from "next/server";
import { MiddlewareHandler } from "./types";

export async function executeMiddlewareChain(
  request: NextRequest,
  handlers: MiddlewareHandler[]
): Promise<NextResponse> {
  for (const handler of handlers) {
    const result = await handler(request);
    if (result.handled) {
      return result.response;
    }
  }
  return NextResponse.next();
}
