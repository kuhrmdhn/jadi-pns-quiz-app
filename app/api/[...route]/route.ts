import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { jwt } from 'hono/jwt'
import answer from '../route/answer'
import question from '../route/question'
import auth from '../route/auth'

const app = new Hono().basePath(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`)

app.get("/", (c) => c.text("test"))

app.use("/answer/new-answer/*", jwt({
  secret: `${process.env.NEXT_SECRET_JWT_SECRET}`
}))
app.use("/question/new-question/*", jwt({
  secret: `${process.env.NEXT_SECRET_JWT_SECRET}`
}))

app.route("/answer", answer)
app.route("/question", question)
app.route("/auth", auth)

export const GET = handle(app)
export const POST = handle(app)