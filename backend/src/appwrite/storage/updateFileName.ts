import { account, storage } from "../config";
import "../../utils/env"
import path from "path"
import { DBFileGetApp } from "../database/savedAssests/getSpecificRecord";
import { ViewFileInfoApp } from "./getFileInfo";
import { updateFolderContentApp } from "../database/fileSystem/updateContent";
import { FileInFolderExistApp } from "../database/fileSystem/IsSameContentExistInFolderasProvided";

type InData = {
    id:string
   fileID:string
   fileName:string
   folderID:string
}

export const RenameFileApp= async (data:InData)=>{
    const getFileData:any = await DBFileGetApp({
        fileID: data.fileID
    })
    if ( getFileData.userID !== data.id){
        throw new Error("Unauthorised!")
    }

    if (! await FileInFolderExistApp({
        id:data.id,
        folderID:data.folderID,
        contentID:data.fileID
    })){
        throw new Error("File does not exist in the folder")
    }

    const fileInfo = await ViewFileInfoApp({
        id: data.id,
        fileID: data.fileID
    
    })

    const extname = path.extname(fileInfo.name)

    const result = await storage.updateFile(
        process.env.AssetsID as string,
        getFileData.fileID,
        data.fileName + extname
    );

    await updateFolderContentApp({
        id:data.id,
        folderID:data.folderID,
        contentID:data.fileID,
        contentType:"file",
        contentName:data.fileName+`${extname}`,
    })
    return result
}