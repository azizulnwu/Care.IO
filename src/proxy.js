import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "./lib/authOptions";

const privateRoutes = [
  "/service-page",
  "/dashboard",
  "/my-profile",
  "/dashboard",
];
// const adminRoutes = ["/dashboard"];

export async function proxy(req) {
  const session = await getServerSession(authOptions);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isLogin = Boolean(token);
  const pathName = req.nextUrl.pathname;
  const isPrivateRoute = privateRoutes.some((route) =>
    pathName.startsWith(route),
  );
  // const isAdminRoute = adminRoutes.some((route) => pathName.startsWith(route));

  if (isPrivateRoute && !isLogin) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathName);
    return NextResponse.redirect(loginUrl);
  }
  // if (isAdminRoute && (!isLogin || session.role !== "admin")) {
  //   const loginUrl = new URL("/login", req.url);
  //   // loginUrl.searchParams.set("callbackUrl",pathName); pathname error due to role check, so we don't set callbackUrl here
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/service-page/:path", "/dashboard/:path*", "/my-profile"],
};
