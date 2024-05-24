import { ID } from "node-appwrite";
import { users } from "../config";
import { getUserApp } from "./getUser";
import { TokenUserApp } from "./createToken";
import { SessionUserApp } from "./createSession";
import { DelSessionUserApp } from "./deleteSession";
import sdk from "node-appwrite"
import "../../utils/env"

type InData = {
    id : string
    oldPassword:string
    newPassword:string
}

export const userPasswordUpdateApp = async (data:InData)=>{
    const TempSessionID = await TokenUserApp({
        id:data.id
    })
    const {secret,expire,phrase} = TempSessionID;
    const sessionData = await SessionUserApp({
        id:data.id,
        secret:secret
    })
    const SessionDocID = sessionData.$id
    const sessionID = sessionData.secret

    await (async ()=>{
        try{
            const Tempclient = new sdk.Client()
            .setEndpoint(process.env.API_Endpoint as string) // Your API Endpoint
            .setProject(process.env.ProjectID as string) // Your project ID
            .setSession(sessionID)
            const TempAccount = new sdk.Account(Tempclient)
            
            await TempAccount.updatePassword(
                data.newPassword,
                data.oldPassword
            );

    
            Tempclient.setSession("")
        }
        catch(e:any){
            throw new Error("Invalid Credentials")
            null
        }


    })()
    await DelSessionUserApp({
        id:data.id,
        sessionId:SessionDocID
    })
    


    return await getUserApp({
        id:data.id
    })
}