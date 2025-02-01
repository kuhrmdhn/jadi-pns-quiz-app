import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie"

const auth = new Hono()

auth.get("/logout", async (c) => {
    deleteCookie(c, "firebase_token", { path: "/" })
    return c.json({
        message: "Logout Successfully"
    }, 200)
})

auth.post("/set-cookie", async (c) => {
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

export default auth