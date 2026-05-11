import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(req: NextRequest) {
  const session = getSessionCookie(req);
  const { pathname } = req.nextUrl;

  if (!session) {
    const loginUrl = new URL("/sign-in", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin routes require additional role check via API
  if (pathname.startsWith("/admin")) {
    const sessionRes = await fetch(
      new URL("/api/auth/get-session", req.url),
      { headers: { cookie: req.headers.get("cookie") ?? "" } }
    );

    if (sessionRes.ok) {
      const data = await sessionRes.json();
      if (data?.user?.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
