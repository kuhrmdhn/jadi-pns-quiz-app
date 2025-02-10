import { firebaseAuth } from "@/app/utils/firebase/firebase";
import { Hono } from "hono";
import { deleteCookie, setCookie, getCookie } from "hono/cookie"

const auth = new Hono()

auth.get("/logout", async (c) => {
    deleteCookie(c, "firebase_token", { path: "/" })
    return c.json({
        message: "Logout Successfully"
    }, 200)
})

auth.post("/set-token", async (c) => {
    const { token } = await c.req.json();
    if (!token) {
        return c.json({
            message: "Token is required!"
        }, 400);
    }
    try {
        setCookie(c, "firebase_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });
        return c.json({ message: "Authenticated" });
    } catch (e) {
        console.error(e);
        return c.json({ message: "Internal Server Error" }, 500);
    }
});

auth.post("verify-user", async (c) => {
    const token = getCookie(c, "firebase_token")
    if (!token) {
        return c.json({ message: "Token is undefined or expired" }, 401)
    }
    try {
        const user = firebaseAuth.currentUser
        if (!user) {
            return c.json({ message: "User is not authenticated" }, 403)
        }
        const newToken = await user.getIdToken(true);
        setCookie(c, "firebase_token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return c.json({ message: "Token refreshed" }, 200);
    } catch (error) {
        console.error("Error refreshing token:", error);
        return c.json({ message: "Failed to refresh token" }, 401);
    }
})

export default auth