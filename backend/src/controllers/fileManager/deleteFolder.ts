import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { RenameFolderApp } from "../../appwrite/database/fileSystem/renameFolder";
import { DeleteFolderApp } from "../../appwrite/database/fileSystem/deleteFolder";

export const ExFuncDeleteFolder = async (req:any,res:Response,next:NextFunction)=>{
    try{
        req.body.id = req.user
        const {id,folderID} = req.body;
        
        
        if(!id || !folderID){
            return next(new AppError("Please provide all the details",400))
        }   

        return next(new AppError(JSON.stringify(await DeleteFolderApp({
            id:id,
            folderID
        })),201))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}