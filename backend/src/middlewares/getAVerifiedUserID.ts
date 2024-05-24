import { NextFunction ,Request,Response} from "express"
import AppError from "../utils/errorClass";
import sdk from "node-appwrite"


export const ProvideUserIdentity = async (req:any,res:Response,next:NextFunction)=>{
    try{
        const {token} = req.body
        try{
            const Tempclient = new sdk.Client()
            .setEndpoint(process.env.API_Endpoint as string) // Your API Endpoint
            .setProject(process.env.ProjectID as string) // Your project ID
            .setSession(token)
            const TempAccount = new sdk.Account(Tempclient)

            const userAccount = await TempAccount.get()
            req.body.id =  userAccount.$id
            req.body.verified = userAccount.emailVerification
            req.user = userAccount.$id
                
            Tempclient.setSession("")
        }
        catch(e:any){
            throw new Error("Identity couldn't be verified for this Operation")
            null
        }
        if (req.body.verified === false){
            throw new Error("Please verify your email to proceed")
        }
        return next()
    }catch(e:any){
        return next(new AppError(e.message,400))
    }   
}