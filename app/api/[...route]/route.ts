import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { jwt } from 'hono/jwt'
import answer from '../routes/answer'
import question from '../routes/question'
import auth from '../routes/auth'

const app = new Hono().basePath(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`)

app.get("/", (c) => c.text("test"))

app.route("/answer", answer)
app.route("/question", question)
app.route("/auth", auth)

export const GET = handle(app)
export const POST = handle(app)
export const api = app
