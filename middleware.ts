import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("firebase_token")?.value;
    const { pathname } = req.nextUrl;
    const unprotectedPages = ["/login", "/register"];

    if (!token && !unprotectedPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && unprotectedPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/exercise/:path*", "/login", "/register"],
};
