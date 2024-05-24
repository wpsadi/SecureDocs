import { account, dbs, storage } from "../../config";
import "../../../utils/env"
import { AccessFolderInfoByIDApp } from "./getFolderInfoByID";
import { DeleteFolderContentApp } from "./deleteContent";

type InData = {
    id:string
   folderID:string
}

export const DeleteFolderApp= async (data:InData)=>{
    const folderInfo:any = await AccessFolderInfoByIDApp({
        id:data.id,
        folderID:data.folderID
    })

    if (folderInfo.userID!== data.id){
        throw new Error("You are not authorized to delete this folder")
    }

    if (folderInfo.folder_name==="#"){
        throw new Error("You can't delete root folder")
    }

    if (folderInfo.content.length!==0){
        throw new Error("You can't delete a folder with content. Empty the folder then delete it")
    }

    const result =await dbs.deleteDocument(
        process.env.mainID as string,
        process.env.FileSystem as string,
        folderInfo.$id as string
    )

    await DeleteFolderContentApp({
        id:data.id,
        folderID:folderInfo.folder_parent,
        contentID:folderInfo.$id
    
    })

    return "Folder Deleted SuccessFully"
    
}