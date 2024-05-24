import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { RenameFileApp } from "../../appwrite/storage/updateFileName";
import { createSubFolderApp } from "../../appwrite/database/fileSystem/createSubFolder";

export const ExFuncCreateFolder = async (req:any,res:Response,next:NextFunction)=>{
    try{
        req.body.id = req.user
        const {id,folderName,parentFolder} = req.body;
        
        
        if(!id || !folderName || !parentFolder){
            return next(new AppError("Please provide all the details",400))
        }   

        return next(new AppError(JSON.stringify(await createSubFolderApp({
            id:id,
            folderName,
            parentFolder:parentFolder
        })),201))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}