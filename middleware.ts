import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "./src/lib/cookie";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get(AUTH_COOKIE);
  if (cookie?.value !== "1") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
