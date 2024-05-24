import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { RenameFolderApp } from "../../appwrite/database/fileSystem/renameFolder";
import { DeleteFolderApp } from "../../appwrite/database/fileSystem/deleteFolder";
import { MainTreeApp } from "../../appwrite/database/fileSystem/MainViewTree";

export const ExFuncMainTree = async (req:any,res:Response,next:NextFunction)=>{
    try{
        req.body.id = req.user
        const {id} = req.body;
        
        
        if(!id){
            return next(new AppError("Please provide all the details",400))
        }   

        return next(new AppError(JSON.stringify(await MainTreeApp({
            id:id,
        })),200))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}