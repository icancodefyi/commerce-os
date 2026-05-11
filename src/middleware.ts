import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(req: NextRequest) {
  const session = getSessionCookie(req);
  const { pathname } = req.nextUrl;

  // Protect /admin and /account routes
  if (!session) {
    const loginUrl = new URL("/sign-in", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
