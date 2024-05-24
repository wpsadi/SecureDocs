import { ID, Query } from "node-appwrite";
import { account, dbs, storage } from "../../config";
import "../../../utils/env"


type InData = {
    id:string
    folderName:string
    parentFolder:string
}

export const FolderNameExistApp= async (data:InData)=>{
    const result = await dbs.listDocuments(
        process.env.mainID as string,
        process.env.FileSystem as string,
        [Query.equal("userID",data.id),Query.equal("folder_name",data.folderName),Query.equal("folder_parent",data.parentFolder)]
    )
    if (result.total ===0){
        return false
    }
    return true
}