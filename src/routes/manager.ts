import { Hono } from "hono";
import { fileDownload } from "../handler/file-download";

export const managerRouter = new Hono()

managerRouter.get('*', fileDownload)