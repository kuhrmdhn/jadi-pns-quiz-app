import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const protectedPages = ["/login", "/register"];
    const token = req.cookies.get("firebase_token")?.value;
    const { pathname } = req.nextUrl;

    if (!protectedPages.includes(pathname)) {
        return NextResponse.next()
    }

    if (!token) {
        try {
            const refreshTokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/refresh-token`, {
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
    matcher: ["/", "/login", "/register"],
};
