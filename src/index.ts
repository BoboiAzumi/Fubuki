import { Hono, type Context } from "hono"
import { serve } from "bun"
import { fileSystemRouter } from "./routes/file-system"
import { managerRouter } from "./routes/manager"
import fs from 'fs'
import { mediaRouter } from "./routes/media"

const hono = new Hono()

hono.get('/', async (c: Context) => {
    return c.html(fs.readFileSync('./views/index.html').toString())
})
hono.route('/api/v1/filesystem', fileSystemRouter)
hono.route('/file', managerRouter)
hono.route('/media', mediaRouter)

serve({
    fetch: hono.fetch,
    port: process.env.PORT || 2000
})