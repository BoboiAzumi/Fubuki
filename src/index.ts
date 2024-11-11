import { Hono, type Context } from "hono"
import { serve } from "bun"
import { readDir } from "./service/FileSystem"

const hono = new Hono()

hono.get("/", (c: Context) => {
    readDir(".")
    return c.text("OK")
})

serve({
    fetch: hono.fetch,
    port: process.env.PORT || 2000
})