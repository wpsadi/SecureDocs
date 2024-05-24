import { ID, Query } from "node-appwrite";
import { account, dbs, storage } from "../../config";
import "../../../utils/env"
import { AccessFolderInfoByIDApp } from "./getFolderInfoByID";
import { updateFolderContentApp } from "./updateContent";
import { FileInFolderExistApp } from "./IsSameContentExistInFolderasProvided";


type InData = {
    id:string
    folderID:string
    folderName:string
}

export const RenameFolderApp= async (data:InData)=>{

    const folderInfo = await AccessFolderInfoByIDApp({
        id:data.id,
        folderID:data.folderID
    })
    const result = await dbs.updateDocument(
        process.env.mainID as string,
        process.env.FileSystem as string,
        folderInfo.$id as string,
        {
            folder_name:data.folderName
        }
    )


    await updateFolderContentApp({
        id:data.id,
        folderID:folderInfo.folder_parent  ,
        contentID:folderInfo.$id ,
        contentType:"folder",
        contentName:data.folderName,
    })

    return result
}