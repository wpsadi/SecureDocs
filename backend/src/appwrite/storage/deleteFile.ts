import { account, storage } from "../config";
import "../../utils/env"
import { DBFileGetApp } from "../database/savedAssests/getSpecificRecord";
import { DeleteFolderContentApp } from "../database/fileSystem/deleteContent";
import { FileInFolderExistApp } from "../database/fileSystem/IsSameContentExistInFolderasProvided";

type InData = {
    id:string
   fileID:string
   folderID:string
}

export const DeleteFileApp= async (data:InData)=>{
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

    const result = await storage.deleteFile(
        process.env.AssetsID as string,
        getFileData.fileID
    );

    

    await DeleteFolderContentApp({
        id:data.id,
        folderID:data.folderID,
        contentID:data.fileID
    })

    return "File Deleted Successfully"
}