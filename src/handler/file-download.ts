import dotenv from "dotenv"
import _path from "path"
import { getFile } from "../service/file-system"
import type { Context } from "hono"
import fs from 'fs'
import mime from 'mime-types'

dotenv.config()
const DEFAULT_DIR = process.env.ROOT_DIR ? process.env.ROOT_DIR : "."

export async function fileDownload(c: Context) {
    const param = c.req.path.replace('/file', '/')
    const range = c.req.header('Range')
    const size = fs.statSync(_path.join(DEFAULT_DIR, param)).size

    if(!range){
        const file: boolean | {buffer: Buffer, mime: string} = getFile(_path.join(DEFAULT_DIR, param))
        c.header('Content-Type', file? file.mime : "text/plain")
        c.header('Content-Length', size.toString())

        return c.body(file ? file.buffer as any : "Error")
    }

    const [start, end] = range.replace(/bytes=/, '').split('-')
    const startInt = parseInt(start, 10)
    const endInt = end ? parseInt(end, 10) : size - 1;

    if(startInt >= size || endInt >= size){
        return c.json({status: "Range Not Satisfiable"}, 416)
    }

    const chunkSize = endInt - startInt + 1;
    const fileStream = fs.readFileSync(_path.join(DEFAULT_DIR, param)).slice(startInt, endInt + 1)

    c.header('Content-Type', mime.lookup(_path.join(DEFAULT_DIR, param)).toString())
    c.header('Content-Length', chunkSize.toString())
    c.header('Content-Range', `bytes ${startInt}-${endInt}/${size}`)
    return c.body(fileStream as any, 206)
}