import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { userPasswordUpdateApp } from "../../appwrite/user/updatePassword";
import { userNameUpdateApp } from "../../appwrite/user/updateUserName";
import { UploadStorageApp } from "../../appwrite/storage/storeItem";

export const ExFuncUploadFile = async (req:any,res:Response,next:NextFunction)=>{
    try{
        req.body.id = req.user
        const {id,fileName,folderID} = req.body;
        
        
        if(!id || !fileName || !folderID){
            return next(new AppError("Please provide all the details",400))
        }   

        return next(new AppError(JSON.stringify(await UploadStorageApp({
            id:id,
            filePath:(req.file as Express.Multer.File).path,
            fileName:fileName,
            folderID
        })),201))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}