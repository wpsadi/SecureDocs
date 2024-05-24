import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { RenameFileApp } from "../../appwrite/storage/updateFileName";

export const ExFuncUpdateFileName = async (req:any,res:Response,next:NextFunction)=>{
    try{
        req.body.id = req.user
        req.body.fileID = req.query.fileID
        const {id,fileID,fileName,folderID} = req.body;
        
        
        if(!id || !fileID || !fileName || !folderID){
            return next(new AppError("Please provide all the details",400))
        }   

        return next(new AppError(JSON.stringify(await RenameFileApp({
            id:id,
            fileID,
            fileName,
            folderID
        })),201))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}