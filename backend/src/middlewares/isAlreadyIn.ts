import { NextFunction ,Request,Response} from "express"
import AppError from "../utils/errorClass";
import { ProvideUserIdentity } from "./getAVerifiedUserID";

export const isAlreadyIn = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const token = req.cookies && req.cookies.ProtectedDocs;
        if(token){
            return next(new AppError("LogOut Existing Session First",400))
        }
        next()
    }catch(e:any){
        return next(new AppError(e.message,400))
    }   
}