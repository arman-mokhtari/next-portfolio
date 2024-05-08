import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["((?!^/admin).*)"],
  ignoredRoutes: ["/api/webhooks"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};