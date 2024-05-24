import { account, storage } from "../config";
import "../../utils/env"
import { DBFileGetApp } from "../database/savedAssests/getSpecificRecord";

type InData = {
    id:string
   fileID:string
}

export const ViewFileInfoApp= async (data:InData)=>{
    const getFileData:any = await DBFileGetApp({
        fileID: data.fileID
    })

    if ( getFileData.userID !== data.id){
        throw new Error("Unauthorised!")
    }
    

    const result = await storage.getFile(
        process.env.AssetsID as string,
        getFileData.fileID
    );
    return result
}