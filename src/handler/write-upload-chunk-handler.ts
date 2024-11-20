import type { Context } from "hono"
import _path from "path"
import dotenv from "dotenv"
import { writeUpload } from "../service/file-system"

dotenv.config()
const ROOT_DIR = process.env.ROOT_DIR ? process.env.ROOT_DIR : "."
const FILEMANAGER_DIR = process.env.FILEMANAGER_DIR ? process.env.FILEMANAGER_DIR : ""
const DEFAULT_DIR = _path.join(ROOT_DIR, FILEMANAGER_DIR)

export async function writeUploadChunkHandler(c: Context){
    try {
        const { files, target, filename, isChunkStart } = await c.req.parseBody({all: true})

        writeUpload(
            _path.join(DEFAULT_DIR, target as string, filename as string), 
            await (files as File).arrayBuffer(),
            "chunk",
            isChunkStart ? true : false
        )

        return c.json({
            status: "OK"
        })
    }
    catch(err: unknown){
        c.status(400)
        return c.json({
            status: "ERROR",
            message: (err as Error).message
        })
    }
}