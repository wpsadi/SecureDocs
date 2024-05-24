import { account } from "../config";
import { createRootFolderApp } from "../database/fileSystem/createRootFolder";
import { SessionUserApp } from "./createSession";
import { TokenUserApp } from "./createToken";
import { DelSessionUserApp } from "./deleteSession";
import sdk from "node-appwrite"

type InData = {
    id : string
    secret : string
}

export const verifyUserEmailApp = async (data:InData)=>{
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
            const Tempclient = new sdk.Client()
            .setEndpoint(process.env.API_Endpoint as string) // Your API Endpoint
            .setProject(process.env.ProjectID as string) // Your project ID
            .setSession(sessionID)
            const TempAccount = new sdk.Account(Tempclient)
            if (process.env.shouldShendEmails as string === "Y"){
                 await  TempAccount.updateVerification(
                    data.id,
                    data.secret
                );
            }
            Tempclient.setSession("")
        


    })()
    await DelSessionUserApp({
        id:data.id,
        sessionId:SessionDocID
    })
    await createRootFolderApp({
        id: data.id
    })
    return "Email Verified SuccessFully"
}