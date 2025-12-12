import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const isAdminPath = pathname.startsWith("/admin");
  const isLoginPath = pathname.startsWith("/login");

  if (!token) {
    if (isAdminPath) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  if (isLoginPath) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/admin/:path*"],
};
