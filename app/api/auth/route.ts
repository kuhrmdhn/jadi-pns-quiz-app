import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { token } = await req.json();

    if (!token) {
        return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }

    const cookieStore = await cookies();
    cookieStore.set("firebase_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });

    return NextResponse.json({ message: "Authenticated" });
}
