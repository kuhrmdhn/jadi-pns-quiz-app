import auth from "@/app/api/routes/auth"
import exercise from "@/app/api/routes/exercise"
import { Hono } from "hono"

export const app = new Hono().basePath(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`)

app.route("/exercise", exercise)
app.route("/auth", auth)
