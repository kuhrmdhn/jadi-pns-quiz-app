import auth from "@/app/api/routes/auth"
import exercise from "@/app/api/routes/exercise"
import learning from "@/app/api/routes/learning"
import user from "@/app/api/routes/user"
import { Hono } from "hono"

export const app = new Hono().basePath(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`)

app.route("/exercise", exercise)
app.route("/user", user)
app.route("/auth", auth)
app.route("/learning", learning)