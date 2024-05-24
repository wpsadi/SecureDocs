import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { RenameFolderApp } from "../../appwrite/database/fileSystem/renameFolder";
import { DeleteFolderApp } from "../../appwrite/database/fileSystem/deleteFolder";
import { MainTreeApp } from "../../appwrite/database/fileSystem/MainViewTree";
import { SubTreeApp } from "../../appwrite/database/fileSystem/viewTree";

export const ExFuncSubTree = async (req:any,res:Response,next:NextFunction)=>{
    try{
        req.body.id = req.user
        req.body.folderID = req.params.folderID
        const {id,folderID} = req.body;
        
        if(!id || !folderID){
            return next(new AppError("Please provide all the details",400))
        }   

        return next(new AppError(JSON.stringify(await SubTreeApp({
            id:id,
            folderID
        })),200))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}