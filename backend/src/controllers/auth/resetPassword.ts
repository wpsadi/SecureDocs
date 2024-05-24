import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass";
import "../../utils/env"
import { userResetPassApp } from "../../appwrite/user/Resetpassword";

export const ExFuncResetPass = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {userId,secret} = req.params
        const {newPassword} = req.body

        if(!userId || !secret || !newPassword){
            return next(new AppError("Please provide all the details",400))
        }
        
        
     
      return next (new AppError(await userResetPassApp({
            id:userId,
            secret,
            newPassword
      }),201))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}