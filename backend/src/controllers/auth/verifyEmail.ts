import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { verifyUserEmailApp } from "../../appwrite/user/verifyEmailVerification";

export const ExFuncVerifyEmail = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {secret,userId} = req.query;

        if(!secret || !userId){
            return next(new AppError("Please provide all the details",400))
        }
        
        return next(new AppError(JSON.stringify(await verifyUserEmailApp({
            id:userId as string,
            secret:secret as string
        })),201))
    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}