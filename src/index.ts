import { Hono, type Context } from "hono"
import { serve } from "bun"
import { fileSystemRouter } from "./routes/file-system"

const hono = new Hono()

hono.route('/api/v1/filesystem', fileSystemRouter)

serve({
    fetch: hono.fetch,
    port: process.env.PORT || 2000
})