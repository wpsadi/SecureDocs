import { ID } from "node-appwrite";
import { dbs, users } from "../../config";

type InData = {
    fileID:string
}

export const DBFileGetApp = async (data:InData)=>{
    const result = await dbs.getDocument(
        process.env.mainID as string,
        process.env.FilesInfo as string,
        data.fileID
    );
    return result
}