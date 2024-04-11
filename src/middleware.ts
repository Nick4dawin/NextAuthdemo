
import { Middleware } from "next/dist/lib/load-custom-routes";
import authConfig from "./auth.config";
import NextAuth, { Session } from "next-auth";
const {auth} = NextAuth(authConfig);
import { authRoutes, publicRoutes,apiAuthPrefix,DEFAULT_LOGIN_REDIRECT } from "./routes";
import { NextRequest } from "next/server";


export default auth((req: NextRequest & { auth: Session | null }): Response | void => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  
  if (isApiAuthRoute) {
    return;
  }
  
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  
 if(!isLoggedIn && !isPublicRoute && nextUrl.pathname !== "/auth/login" && nextUrl.pathname !== "/auth/register" ){
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  
  return;},);

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)"
  ]
}