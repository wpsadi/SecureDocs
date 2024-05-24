import { ID } from "node-appwrite";
import { account, dbs, storage } from "../../config";
import "../../../utils/env"
import { getFolderInfoApp } from "./getFolderInfo";


type InData = {
    id:string
    folderID:string
    contentID:string
    contentType:string
    contentName:string
}

export const updateFolderContentApp= async (data:InData)=>{
   
    const folderInfo:any = await dbs.getDocument(
        process.env.mainID as string,
        process.env.FileSystem as string,
        data.folderID
    )

    if (folderInfo.userID!== data.id){
        throw new Error("You are not authorized to add content to this folder")
    }
    
     // @ts-ignore
     const JSONArray = (folderInfo.content).map(item=>JSON.parse(item))
    // @ts-ignore
    const afterRemovedData = JSONArray.filter(item=>{
        return item.id!==data.contentID
    })
     // @ts-ignore
     const stringJSONArray =afterRemovedData.map(item=>JSON.stringify(item))


    const result =await dbs.updateDocument(
        process.env.mainID as string,
        process.env.FileSystem as string,
        folderInfo.$id as string,
        
        {

            content:[...stringJSONArray,JSON.stringify({
                name:data.contentName,
                id:data.contentID,
                type:data.contentType
            })]
        }

    )
    return result
}