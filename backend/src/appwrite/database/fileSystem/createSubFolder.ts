import { ID } from "node-appwrite";
import { account, dbs, storage } from "../../config";
import "../../../utils/env"
import { RootFolderApp } from "./RootFolderInfo";
import { FolderNameExistApp } from "./isFolderwithThisNameExists";
import { getFolderInfoApp } from "./getFolderInfo";
import { addFolderContentApp } from "./addContent";


type InData = {
    id:string
    folderName:string
    parentFolder:string
}

export const createSubFolderApp= async (data:InData)=>{
    const unAcceptableFolderNames = ["#","-"]
    if (unAcceptableFolderNames.includes(data.folderName)){
        throw new Error(`Invalid Folder Name! Folder name can't be ${unAcceptableFolderNames.join(", ")} `)
    }


    const subFolderID = ID.unique();
    const rootFolder:any = await RootFolderApp({
        id:data.id
    })


    if (await FolderNameExistApp({
        id:data.id,
        folderName:data.folderName,
        parentFolder:data.parentFolder

    })){
        throw new Error("Folder with this name already exists")
    }

    let folderName:string ;


    const result = await dbs.createDocument(
        process.env.mainID as string,
        process.env.FileSystem as string,
        subFolderID,
        {
            userID: data.id,
            folder_name:data.folderName,
            folder_parent: data.parentFolder,
            content:[]
        }
    );

    await addFolderContentApp({
        id:data.id,
        folderID:data.parentFolder,
        contentId:result.$id,
        contentType:"folder",
        contentName:data.folderName



    })

    return result
}