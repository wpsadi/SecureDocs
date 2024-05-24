import { ID, Query } from "node-appwrite";
import { account, dbs, storage } from "../../config";
import "../../../utils/env"


type InData = {
    id:string
    folderID:string
}

export const AccessFolderInfoByIDApp= async (data:InData)=>{
    const folderInfo:any = await dbs.getDocument(
        process.env.mainID as string,
        process.env.FileSystem as string,
        data.folderID
    )
    
    if (folderInfo.userID !== data.id){
        throw new Error("You are not authorized to access this folder. The method to get by ID has failed")
    }


    return folderInfo
}