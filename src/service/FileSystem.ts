import fs from "fs"

export function readDir(path: string){
    const files = fs.readdirSync(".", {withFileTypes: true})
    console.log(files)
}