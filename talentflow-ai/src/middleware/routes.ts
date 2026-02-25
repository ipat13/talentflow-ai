export const protectedRoutes = ["/dashboard", "/jobs", "/candidates"];

export const authRoutes = ["/login"];

export function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

export function isAuthRoute(pathname: string): boolean {
  return authRoutes.some((route) => pathname.startsWith(route));
}

export function getRedirectUrl(baseUrl: string, pathname: string): URL {
  const url = new URL("/login", baseUrl);
  url.searchParams.set("redirect", pathname);
  return url;
}
