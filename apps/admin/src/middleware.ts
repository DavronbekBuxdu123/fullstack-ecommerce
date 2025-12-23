import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { CustomJWTSessionClaims } from "@repo/types";
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/unauthorized(.*)"]);
// export default clerkMiddleware(async (auth, req) => {
//   if (!isPublicRoute(req)) {
//     const { userId, sessionClaims } = await auth.protect();

//     console.log("SESSION CLAIMS:", sessionClaims);

//     const userRole = (sessionClaims as CustomJWTSessionClaims).metadata?.role;
//     console.log("USER ROLE:", userRole);

//     if (userRole !== "admin") {
//       return Response.redirect(new URL("/unauthorized", req.url));
//     }
//   }
// });

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
