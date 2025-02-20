import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const authPage = ["/login", "/register"];
    const protectedPage = ["/exercise"];
    const token = req.cookies.get("firebase_token")?.value;
    const { pathname } = req.nextUrl;

    if (token) {
        return NextResponse.next();
    }

    try {
        const refreshTokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/refresh-token`, {
            method: "POST",
            credentials: "include"
        });

        if (!refreshTokenResponse.ok) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (authPage.some((path) => pathname.startsWith(path)) && !token) {
        return NextResponse.next();
    }

    if (protectedPage.some((path) => pathname.startsWith(path)) && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/exercise/:path*", "/login", "/register"],
};
