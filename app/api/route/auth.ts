import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie"

const auth = new Hono()

auth.get("/", (c) => {
    return c.text("cok")
})

auth.get("/logout", async (c) => {
    deleteCookie(c, "firebase_token", { path: "/" })
    return c.json({
        message: "Logout Successfully"
    }, 200)
})

auth.post("/", async (c) => {
    const { token } = await c.req.json()

    if (!token) {
        return c.json({
            message: "Token is required!"
        }, 400)
    }
    if (token) {
        setCookie(c, "firebase_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        })
    }
})

export default auth