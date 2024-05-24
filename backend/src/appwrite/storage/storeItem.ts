import { storage } from "../config";
import { ID, InputFile } from "node-appwrite";
import "../../utils/env"
import fs from "fs"
import path from "path"
import fsPromise from "fs/promises"
import { DBFileCreateApp } from "../database/savedAssests/createRecord";
import { addFolderContentApp } from "../database/fileSystem/addContent";


type InData = {
    id : string
    filePath:string
    folderID:string
    fileName:string
}

export const UploadStorageApp = async (data:InData)=>{
    const FileId = ID.unique()
    const extName = path.extname(data.filePath)
    const UploadData = await storage.createFile(
        process.env.AssetsID as string,
        FileId,
        InputFile.fromPath(data.filePath,data.fileName+`${extName}`)
    );
    const fileStoredInfo:any = await DBFileCreateApp({
        id: data.id,
        fileID: FileId
        
    })
    fsPromise.rm(data.filePath)
    await addFolderContentApp({
        id:data.id,
        folderID:data.folderID,
        contentId: fileStoredInfo.$id,
        contentType:"file",
        contentName:data.fileName+`${extName}`,
    })
    return  fileStoredInfo
}
