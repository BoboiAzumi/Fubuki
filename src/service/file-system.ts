import fs from "fs"
import type { FileSystemTypes } from "../types/file-system"
import _path from "path"

export function list(path: string): FileSystemTypes[]{
    const files = fs.readdirSync(path, {withFileTypes: true})
    const fileList: FileSystemTypes[] = []

    files.map((v, i) => {
        fileList.push({
            index: i,
            name: v.name,
            type: v.isFile() ? "file" : v.isDirectory() ? "directory" : "unknown",
            isFifo: v.isFIFO(),
            isSymlink: v.isSymbolicLink(),
            isSocket: v.isSocket(),
            isBlockDevice: v.isBlockDevice(),
            isCharacterDevice: v.isCharacterDevice()
        } as FileSystemTypes)
    })

    return fileList
}

export function mkdir(path: string, dirname: string){
    fs.mkdirSync(_path.join(path, dirname))
}

export function touch(path: string, filename: string){
    fs.writeFileSync(_path.join(path, filename), '')
}

export function copy(path: string, target: string){
    const stats = fs.statSync(path)
    if(stats.isFile()){
        fs.copyFileSync(path, target)
    }
    else{
        fs.cpSync(path, target)
    }
}

export function move(path: string, target: string){
    fs.renameSync(path, target)
}

export function remove(path: string){
    const stats = fs.statSync(path)
    if(stats.isFile()){
        fs.unlinkSync(path)
    }
    else{
        fs.rmdirSync(path)
    }
}