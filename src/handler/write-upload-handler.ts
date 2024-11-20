import type { Context } from "hono"
import _path from "path"
import dotenv from "dotenv"
import { writeUpload } from "../service/file-system"

dotenv.config()
const ROOT_DIR = process.env.ROOT_DIR ? process.env.ROOT_DIR : "."
const FILEMANAGER_DIR = process.env.FILEMANAGER_DIR ? process.env.FILEMANAGER_DIR : ""
const DEFAULT_DIR = _path.join(ROOT_DIR, FILEMANAGER_DIR)

export async function writeUploadHandler(c: Context){
    try {
        const { files, target } = await c.req.parseBody({all: true})

        if(Array.isArray(files)){
            for(let i = 0; i < files.length; i++){
                writeUpload(
                    _path.join(DEFAULT_DIR, target as string, (files[i] as File).name), 
                    await (files[i] as File).arrayBuffer()
                )
            }
        }
        else{
            writeUpload(
                _path.join(DEFAULT_DIR, target as string, (files as File).name), 
                await (files as File).arrayBuffer()
            )
        }

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