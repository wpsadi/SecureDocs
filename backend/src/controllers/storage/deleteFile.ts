import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { DeleteFileApp } from "../../appwrite/storage/deleteFile";

export const ExFuncDeleteFile = async (req:any,res:Response,next:NextFunction)=>{
    try{
        req.body.id = req.user
        req.body.fileID = req.query.fileID
        const {id,fileID,folderID} = req.body;
        
        
        if(!id || !fileID){
            return next(new AppError("Please provide all the details",400))
        }   

        return next(new AppError(JSON.stringify(await  DeleteFileApp({
            id:id,
            fileID,
            folderID
        })),201))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}