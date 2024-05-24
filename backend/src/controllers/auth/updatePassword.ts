import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { userPasswordUpdateApp } from "../../appwrite/user/updatePassword";

export const ExFuncUpdatePass = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id,oldPassword,newPassword} = req.body;

        if(!id || !oldPassword || !newPassword){
            return next(new AppError("Please provide all the details",400))
        }   

        return next(new AppError(JSON.stringify(await userPasswordUpdateApp({
            id,
            oldPassword,
            newPassword
        })),201))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}