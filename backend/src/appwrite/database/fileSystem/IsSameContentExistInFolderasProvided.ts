import { ID, Query } from "node-appwrite";
import { account, dbs, storage } from "../../config";
import "../../../utils/env"


type InData = {
    id:string
    folderID:string
    contentID:string
}

export const FileInFolderExistApp= async (data:InData)=>{
    const folderInfo:any = await dbs.getDocument(
        process.env.mainID as string,
        process.env.FileSystem as string,
        data.folderID
    )

    if (folderInfo.userID !== data.id){
        throw new Error("You are not authorized to check content of this folder")
    }

    if (folderInfo.content.length === 0){
        return false
    }

    // @ts-ignore
    const JSONArray = (folderInfo.content).map(item=>JSON.parse(item))
    // @ts-ignore
    const fileInfo = JSONArray.filter(item=>item.id === data.contentID)


   if (fileInfo.length===1){
         return true
   }
    return false
}