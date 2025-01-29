import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const protectedPage = ["/login", "/register"]
    const token = req.cookies.get("firebase_token")?.value
    const { pathname } = req.nextUrl
    if (token && ["/signIn", "/signUp"].includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (!token && !protectedPage.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/login", "/register"]
}