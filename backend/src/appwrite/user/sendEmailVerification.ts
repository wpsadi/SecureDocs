import { ID } from "node-appwrite";
import client, { account, users } from "../config";
import { getUserApp } from "./getUser";
import sdk from "node-appwrite"
import "../../utils/env"

import { TokenUserApp } from "./createToken";
import { SessionUserApp } from "./createSession";
import { DelSessionUserApp } from "./deleteSession";

type InData = {
    id : string
}

export const userEmailVerificationLinkGenerationApp = async (data:InData)=>{
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
            if (process.env.shouldShendEmails as string === "Y"){
                 await  TempAccount.createVerification(
                    process.env.EmailVerificationURL as string // url
                );
            }

    
            Tempclient.setSession("")
        }
        catch(e:any){
            null
        }


    })()
    await DelSessionUserApp({
        id:data.id,
        sessionId:SessionDocID
    })


}