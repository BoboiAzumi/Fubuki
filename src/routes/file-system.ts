import { Hono } from "hono";
import { file } from "../handler/file";
import { writeUploadHandler } from "../handler/write-upload-handler";
import { bodyLimit } from "hono/body-limit";
import { writeUploadChunkHandler } from "../handler/write-upload-chunk-handler";

export const fileSystemRouter = new Hono()

fileSystemRouter.post("/", file)
fileSystemRouter.post("/upload", bodyLimit({
    maxSize: 1024 * 1024 * 1024 * 10
}),writeUploadHandler)
fileSystemRouter.post("/chunk", writeUploadChunkHandler)