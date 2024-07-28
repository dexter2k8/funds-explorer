import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

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
  matcher: ["/", "/dashboard/:path*"], // routes to be protected
};

async function verifyToken(token: string) {
  const response = await fetch(`${clientUrl}/api/verify_token`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `funds-explorer-token=${token}`,
    },
  }).then((res) => res.json());
  return response.isValid;
}
