import { NextResponse } from "next/server";
import { verifyToken } from "./utils/lib";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("funds-explorer-token")?.value;
  const loginUrl = new URL("/", req.url);

  if (!token && pathname !== "/") {
    return NextResponse.redirect(loginUrl);
  }

  if (token) {
    const isValid = await verifyToken(token);

    if (!isValid) {
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("funds-explorer-token");
      return response;
    }
    if (pathname === "/") {
      const dashboardUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|/:path*|_next/image|sign-up|favicon.ico|image|sign-up/).*)"], // routes to be unprotected, separated by "|"
};
