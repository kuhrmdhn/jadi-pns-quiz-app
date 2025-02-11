import { app } from '@/app/utils/hono/honoApp'
import { handle } from 'hono/vercel'

export const GET = handle(app)
export const POST = handle(app)
