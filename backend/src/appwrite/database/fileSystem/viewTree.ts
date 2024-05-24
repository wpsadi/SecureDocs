import { account, dbs, storage } from "../../config";
import "../../../utils/env"
import { AccessFolderInfoByIDApp } from "./getFolderInfoByID";
import { DeleteFolderContentApp } from "./deleteContent";
import { RootFolderApp } from "./RootFolderInfo";

type InData = {
    id:string
    folderID:string
}

export const SubTreeApp= async (data:InData)=>{
    const FolderInfo = await AccessFolderInfoByIDApp({
        id:data.id,
        folderID:data.folderID
    })

        
     // @ts-ignore
     const JSONArray = (FolderInfo.content).map(item=>JSON.parse(item))

    return {
        ...FolderInfo,
        content:JSONArray
    }
    
}