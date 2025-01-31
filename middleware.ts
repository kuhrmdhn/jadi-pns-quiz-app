import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const protectedPages = ["/login", "/register"];
    const token = req.cookies.get("firebase_token")?.value;
    const { pathname } = req.nextUrl;

    if (token && protectedPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!token && !protectedPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/register"],
};
