import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(req: NextRequest) {
  const session = getSessionCookie(req);
  const { pathname } = req.nextUrl;

  // Protect /account routes - just check session exists
  if (pathname.startsWith("/account")) {
    if (!session) {
      const loginUrl = new URL("/sign-in", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Admin routes - just check session exists (role check happens in server component)
  if (pathname.startsWith("/admin")) {
    if (!session) {
      const loginUrl = new URL("/sign-in", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
