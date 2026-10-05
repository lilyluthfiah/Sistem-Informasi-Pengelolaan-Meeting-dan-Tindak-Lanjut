import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isLoginRoute = pathname === "/login";

  // Proteksi /dashboard: harus ada token valid
  if (isDashboardRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secretKey);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("session");
      return response;
    }
  }

  // Jika sudah login, jangan tampilkan /login lagi
  if (isLoginRoute && token) {
    try {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secretKey);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch {
      // token invalid, biarkan ke login dan hapus cookie
      const response = NextResponse.next();
      response.cookies.delete("session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
