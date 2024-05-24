import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { userPasswordUpdateApp } from "../../appwrite/user/updatePassword";
import { userNameUpdateApp } from "../../appwrite/user/updateUserName";

export const ExFuncUpdateName = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id,Name} = req.body;

        if(!id || !Name){
            return next(new AppError("Please provide all the details",400))
        }   

        return next(new AppError(JSON.stringify(await userNameUpdateApp({
            id,
            Name
        })),201))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}