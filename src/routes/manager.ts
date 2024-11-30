import { Hono } from "hono";
import dotenv from 'dotenv'
import { fileDownload } from "../handler/file-download";

dotenv.config()

export const managerRouter = new Hono()

managerRouter.get('*', fileDownload)