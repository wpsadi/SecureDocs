import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass";
import "../../utils/env"
import { userLoginApp } from "../../appwrite/user/loginUser";
import { DelSessionUserApp } from "../../appwrite/user/deleteSession";

export const ExFuncLogOut = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        try{
            const token = req.cookies && req.cookies[`${process.env.cookieName as string}`];
            await DelSessionUserApp({
                id:token,
                sessionId:token
            })
        }
        catch(e){
            null
        }
 
         res.cookie("ProtectedDocs","",{
            httpOnly:true,
            secure:true,
            expires:new Date(0),
            sameSite:"strict",
            path:"/",
            
        })

     
        return next(new AppError("LoggedOut SuccessFully",201))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}