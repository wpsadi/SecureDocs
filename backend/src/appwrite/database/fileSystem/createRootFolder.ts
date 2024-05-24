import { ID } from "node-appwrite";
import { account, dbs, storage } from "../../config";
import "../../../utils/env"


type InData = {
    id:string
}

export const createRootFolderApp= async (data:InData)=>{
    const folderID = ID.unique();
    const result = await dbs.createDocument(
        process.env.mainID as string,
        process.env.FileSystem as string,
        folderID,
        {
            userID: data.id,
            folder_name:"#",
            folder_parent: "-",
            content:[]
        }
    );
    return result
}