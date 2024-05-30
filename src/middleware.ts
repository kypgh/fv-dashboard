import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const rToken = request.cookies.get("refreshToken")?.value;
  console.log("HERE", request.url);
  // if (!rToken && new URL(request.url).pathname !== "/login") {
  //   return NextResponse.redirect(new URL("/login", request.url));
  //   // return;
  // }
  // && !request.nextUrl.pathname.startsWith("/login")
  if (!rToken) return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
