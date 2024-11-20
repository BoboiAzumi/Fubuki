import { type Context } from "hono";
import { FileRequests } from "../global/file-requests";
import { copy, list, mkdir, move, remove, touch } from "../service/file-system";
import _path from "path"
import dotenv from "dotenv"

dotenv.config()
const ROOT_DIR = process.env.ROOT_DIR ? process.env.ROOT_DIR : "."
const FILEMANAGER_DIR = process.env.FILEMANAGER_DIR ? process.env.FILEMANAGER_DIR : ""
const DEFAULT_DIR = _path.join(ROOT_DIR, FILEMANAGER_DIR)

export async function file(c: Context){
    try{
        const { method, path, dirname, filename, target } = await c.req.json()

        switch(method){
            case FileRequests.LIST:
                const dir = list(`./${_path.join(DEFAULT_DIR, path ? path : "")}`)

                return c.json({
                    status: "OK",
                    data: dir
                })

            case FileRequests.MKDIR:
                mkdir(_path.join(DEFAULT_DIR, path ? path : ""), dirname)

                return c.json({
                    status: "OK"
                })

            case FileRequests.TOUCH:
                touch(_path.join(DEFAULT_DIR, path ? path : ""), filename)

                return c.json({
                    status: "OK"
                })
            
            case FileRequests.REMOVE:
                remove(_path.join(DEFAULT_DIR, path ? path : ""))

                return c.json({
                    status: "OK"
                })
            
            case FileRequests.COPY:
                copy(_path.join(DEFAULT_DIR, path ? path : ""), _path.join(DEFAULT_DIR, target ? target : ""))

                return c.json({
                    status: "OK"
                })

            case FileRequests.MOVE:
                move(_path.join(DEFAULT_DIR, path ? path : ""), _path.join(DEFAULT_DIR, target ? target : ""))
    
                return c.json({
                    status: "OK"
                })
        }
    }
    catch(err: unknown){
        c.status(400)
        return c.json({
            status: "ERROR",
            message: (err as Error).message
        })
    }
}