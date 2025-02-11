import answer from "@/app/api/routes/answer"
import auth from "@/app/api/routes/auth"
import question from "@/app/api/routes/question"
import { Hono } from "hono"
import { handle } from "hono/vercel"

export const app = new Hono().basePath(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`)

app.get("/", (c) => c.text("test"))

app.route("/answer", answer)
app.route("/question", question)
app.route("/auth", auth)
