import { Hono } from "hono";
import { serveStatic } from "hono/serve-static";
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

export const managerRouter = new Hono()

managerRouter.get('*', serveStatic({
    root: './',
    getContent: async (path) => {
        try{
            path = path.replace('file', `${process.env.ROOT_DIR}`)
            return fs.readFileSync(path) as any
        }
        catch{
            return new Response(JSON.stringify({status: "File Not Found"}), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    }
}))