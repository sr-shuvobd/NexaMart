import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect routes based on authentication requirements
  const isProtectedPath = 
    pathname.startsWith("/admin") || 
    pathname.startsWith("/seller") || 
    pathname.startsWith("/cart") || 
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/wishlist") ||
    pathname.startsWith("/orders");

  if (isProtectedPath) {
    // Check for the better-auth session cookie
    const hasSessionCookie = 
      request.cookies.has("better-auth.session_token") || 
      request.cookies.has("__Secure-better-auth.session_token");
    
    if (!hasSessionCookie) {
      // Redirect unauthenticated users to the login page
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", 
    "/seller/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/profile/:path*",
    "/wishlist/:path*",
    "/orders/:path*"
  ]
};
