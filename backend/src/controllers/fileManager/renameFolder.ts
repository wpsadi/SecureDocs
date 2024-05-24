import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { RenameFolderApp } from "../../appwrite/database/fileSystem/renameFolder";

export const ExFuncRenameFolder = async (req:any,res:Response,next:NextFunction)=>{
    try{
        req.body.id = req.user
        const {id,folderName,folderID} = req.body;
        
        
        if(!id || !folderName || !folderID){
            return next(new AppError("Please provide all the details",400))
        }   

        return next(new AppError(JSON.stringify(await RenameFolderApp({
            id:id,
            folderName,
            folderID
        })),201))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}