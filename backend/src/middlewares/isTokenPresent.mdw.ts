import { NextFunction ,Request,Response} from "express"
import AppError from "../utils/errorClass";
import "../utils/env"
import { ProvideUserIdentity } from "./getAVerifiedUserID";

export const isTokenPresent = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const token = req.cookies && req.cookies[`${process.env.cookieName as string}`];
        if(!token){
            return next(new AppError("Please Login",400))
        }
        req.body.token = token;

        return ProvideUserIdentity(req,res,next)
    }catch(e:any){
        return next(new AppError(e.message,400))
    }   
}