export type FileSystemTypes = {
    index: number,
    name: string,
    type: string,
    isFifo: boolean,
    isSymlink: boolean,
    isSocket: boolean,
    isBlockDevice: boolean,
    isCharacterDevice: boolean
}