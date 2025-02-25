import { firebaseAdminAuth } from "@/utils/firebase/admin";
import { firebaseAuth } from "@/utils/firebase/firebase";
import { signOut } from "firebase/auth";
import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";

const auth = new Hono()

auth.get("/logout", async (c) => {
    try {
        deleteCookie(c, "firebase_token", { path: "/" });
        await signOut(firebaseAuth)
        return c.json({
            message: "Logout Successfully",
        }, 200);
    } catch (err) {
        const error = err as Error;
        return c.json({ message: error.message }, 500);
    }
});

auth.post("/set-token", async (c) => {
    const { token } = await c.req.json();

    if (!token) {
        return c.json({ message: "Token is required!" }, 400);
    }

    try {
        await firebaseAdminAuth.verifyIdToken(token);

        setCookie(c, "firebase_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 3,
        });

        console.log("✅ Token verified and cookie set.");
        return c.json({ message: "Authenticated" });
    } catch (e) {
        console.error("❌ Token verification failed:", e);
        return c.json({ message: "Invalid token" }, 401);
    }
});

export default auth