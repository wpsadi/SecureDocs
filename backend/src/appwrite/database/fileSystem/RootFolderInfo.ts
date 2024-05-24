import { ID, Query } from "node-appwrite";
import { account, dbs, storage } from "../../config";
import "../../../utils/env"


type InData = {
    id:string
}

export const RootFolderApp= async (data:InData)=>{
    const result:any = await dbs.listDocuments(
        process.env.mainID as string,
        process.env.FileSystem as string,
        [Query.equal("userID",data.id),Query.equal("folder_name","#")]
    )
    if (result.total !==1){
        throw new Error("Root Folder Not Found. In this particular Case you need to contact support team")
    }

    return result.documents[0]
}