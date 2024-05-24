import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass";
import "../../utils/env"
import {z} from "zod"
import { userLoginApp } from "../../appwrite/user/loginUser";
import { DelSessionUserApp } from "../../appwrite/user/deleteSession";
import { userFrgtPassApp } from "../../appwrite/user/Send-frgtPassword";

export const ExFuncFrgtPass = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email} = req.body

        if (!z.string().email().parse(email)){
            return next(new AppError("Invalid Email",400))
        }
        
        await userFrgtPassApp({
            email
        
        })
     
        return next(new AppError("Mail Sent for Next Step",201))


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}