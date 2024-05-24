import { ID } from "node-appwrite";
import { dbs, users } from "../../config";

type InData = {
    id : string,
    fileID:string
}

export const DBFileCreateApp = async (data:InData)=>{
    const FileData = await dbs.createDocument(
        process.env.mainID as string,
        process.env.FilesInfo as string,
        ID.unique(),
        {
            userID: data.id,
            fileID: data.fileID
        }
    );
    return FileData
}