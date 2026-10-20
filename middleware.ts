import { NextResponse, type NextRequest } from "next/server";
import { defaultLanguage, isLanguage } from "./lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLanguage}`, request.url));
  }

  const segment = pathname.split("/")[1] ?? "";
  if (isLanguage(segment)) return NextResponse.next();

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(`/${defaultLanguage}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
