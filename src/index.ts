import { Hono, type Context } from "hono"
import { serve } from "bun"
import { fileSystemRouter } from "./routes/file-system"
import { managerRouter } from "./routes/manager"
import fs from 'fs'
import { mediaRouter } from "./routes/media"
import ejs from 'ejs'
import _path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const hono = new Hono()

hono.get('/', async (c: Context) => {
    return c.html(fs.readFileSync('./views/index.html').toString())
})
hono.route('/api/v1/filesystem', fileSystemRouter)
hono.route('/api/v1/media', mediaRouter)
hono.route('/file', managerRouter)
hono.get('/embed', async (c: Context) => {
    const path = `/file${c.req.query('path')}`
    return c.html(ejs.renderFile('./views/embed.ejs', {path}))
})

serve({
    fetch: hono.fetch,
    port: process.env.PORT || 2000
})