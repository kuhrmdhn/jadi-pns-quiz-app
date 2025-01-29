import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import answer from '../route/answer'
import question from '../route/question'
import { jwt } from 'hono/jwt'
export const runtime = 'nodejs'

const app = new Hono().basePath(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`)

app.use("/answer/new-answer/*", jwt({
  secret: `${process.env.NEXT_SECRET_JWT_SECRET}`
}))
app.use("/question/new-question/*", jwt({
  secret: `${process.env.NEXT_SECRET_JWT_SECRET}`
}))

app.route("/answer", answer)
app.route("/question", question)

export const GET = handle(app)
export const POST = handle(app)