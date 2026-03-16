import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // Adicionar headers de segurança
  const response = NextResponse.next();
  
  // Headers de segurança
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
