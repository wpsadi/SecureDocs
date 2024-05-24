import { ID } from "node-appwrite";
import { dbs, users } from "../../config";
import { DBFileGetApp } from "./getSpecificRecord";

type InData = {
    id : string,
    fileID:string
}

export const DBFileCreateApp = async (data:InData)=>{
    const fileInfo:any = await DBFileGetApp({
        fileID: data.fileID
    
    })
    if (fileInfo.userID !== data.id){
        throw new Error("Unauthorised!")
    }
    const FileData = await dbs.deleteDocument(
        process.env.mainID as string,
        process.env.FilesInfo as string,
        data.fileID
    );
    return "File Delete SuccessFully"
}