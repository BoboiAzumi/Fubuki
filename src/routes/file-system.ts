import { Hono, type Context } from "hono";
import { FileRequests } from "../global/file-requests";
import { copy, list, mkdir, remove, touch, writeUpload } from "../service/file-system";
import _path from "path"
import dotenv from "dotenv"

dotenv.config()
const DEFAULT_DIR = process.env.DEFAULT_DIR ? process.env.DEFAULT_DIR : "."

export const fileSystemRouter = new Hono()

fileSystemRouter.post("/", async (c: Context) => {
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
                copy(_path.join(DEFAULT_DIR, path ? path : ""), target)

                return c.json({
                    status: "OK"
                })

            case FileRequests.MOVE:
                copy(_path.join(DEFAULT_DIR, path ? path : ""), target)
    
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
})

fileSystemRouter.post("/upload", async (c: Context) => {
    try {
        const { files, target } = await c.req.parseBody({all: true})

        if(Array.isArray(files)){
            for(let i = 0; i < files.length; i++){
                writeUpload(_path.join(DEFAULT_DIR, target as string, (files[i] as File).name), await (files[i] as File).arrayBuffer())
            }
        }
        else{
            writeUpload(_path.join(DEFAULT_DIR, target as string, (files as File).name), await (files as File).arrayBuffer())
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
})