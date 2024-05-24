import { ID, Query } from "node-appwrite";
import { account, dbs, storage } from "../../config";
import "../../../utils/env"
import { FolderNameExistApp } from "./isFolderwithThisNameExists";


type InData = {
    id:string
    parentFolder:string
    folderName:string
}

export const getFolderInfoApp= async (data:InData)=>{
    const checkFolderExists = await FolderNameExistApp({
        id:data.id,
        folderName:data.folderName,
        parentFolder:data.parentFolder
    })


    if (!checkFolderExists){
        throw new Error("Folder Not Found while fetching it's details")
    }




    const result = await dbs.listDocuments(
        process.env.mainID as string,
        process.env.FileSystem as string,
        [Query.equal("userID",data.id),Query.equal("folder_name",data.folderName),Query.equal("folder_parent",data.parentFolder)]
    )
    if (result.total > 1){
        throw new Error("Sub-Folder Conflict. In this particular Case you need to contact support team")
    }
    return result.documents[0]
}