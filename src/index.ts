import { Hono } from "hono"
import { serve } from "bun"

const hono = new Hono()



serve({
    fetch: hono.fetch,
    port: process.env.PORT || 2000
})