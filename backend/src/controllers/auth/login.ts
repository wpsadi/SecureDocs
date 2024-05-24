import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass";
import { userLoginApp } from "../../appwrite/user/loginUser";

export const ExFuncLogin = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return next(new AppError("Please provide all the details",400))
        }   

        const result = await userLoginApp({
            email,password
         })

         res.cookie("ProtectedDocs",result.secret,{
            httpOnly:true,
            secure:true,
            expires:new Date(result.expire),
            sameSite:"strict",
            path:"/",
            
        })

     
        return next(new AppError(JSON.stringify(result),201))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}