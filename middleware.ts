import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const protectedPages = ["/login", "/register","/exercise"];
    const token = req.cookies.get("firebase_token")?.value;
    const { pathname } = req.nextUrl;

    if (protectedPages.includes(pathname) && token) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    if (!token) {
        try {
            const refreshTokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/verify-user`, {
                method: "POST",
                credentials: "include"
            })

            if (!refreshTokenResponse.ok) {
                return NextResponse.redirect(new URL("/login", req.url));
            }

            return NextResponse.next()
        } catch (error) {
            console.error(error);
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/exercise/:path*", "/login", "/register"],
};