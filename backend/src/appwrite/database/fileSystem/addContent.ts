import { ID } from "node-appwrite";
import { account, dbs, storage } from "../../config";
import "../../../utils/env"
import { getFolderInfoApp } from "./getFolderInfo";


type InData = {
    id:string
    folderID:string
    contentId:string
    contentType:string
    contentName:string
}

export const addFolderContentApp= async (data:InData)=>{
    const folderInfo:any = await dbs.getDocument(
        process.env.mainID as string,
        process.env.FileSystem as string,
        data.folderID
    )

    if (folderInfo.userID!== data.id){
        throw new Error("You are not authorized to add content to this folder")
    }


    const result =await dbs.updateDocument(
        process.env.mainID as string,
        process.env.FileSystem as string,
        folderInfo.$id as string,
        {
            content:[...folderInfo.content,JSON.stringify({
                name:data.contentName,
                id:data.contentId,
                type:data.contentType
            })]
        }

    )
    return result
}