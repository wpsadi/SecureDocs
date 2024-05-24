import { account, dbs, storage } from "../../config";
import "../../../utils/env"
import { AccessFolderInfoByIDApp } from "./getFolderInfoByID";
import { DeleteFolderContentApp } from "./deleteContent";
import { RootFolderApp } from "./RootFolderInfo";

type InData = {
    id:string
}

export const MainTreeApp= async (data:InData)=>{
    const rootFolder = await RootFolderApp({
        id:data.id
    })

        
     // @ts-ignore
     const JSONArray = (rootFolder.content).map(item=>JSON.parse(item))



     return {
        ...rootFolder,
        content:JSONArray
    }
    
}