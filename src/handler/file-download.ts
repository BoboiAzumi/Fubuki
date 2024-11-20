import dotenv from "dotenv"
import _path from "path"
import { getFile } from "../service/file-system"
import type { Context } from "hono"

dotenv.config()
const DEFAULT_DIR = process.env.ROOT_DIR ? process.env.ROOT_DIR : "."

export async function fileDownload(c: Context) {
    const param = c.req.path.replace('/file', '/')

    const file = getFile(_path.join(DEFAULT_DIR, param))

    if(!file){
        return c.json({
            status: 'FAILED',
            message: 'it\'s not file'
        })
    }

    c.header('Content-Type', file.mime as any)

    return c.body(file.buffer as any)

}