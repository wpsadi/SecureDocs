import { ID } from "node-appwrite";
import { account } from "../config";

type InData = {
    id : string
    secret : string
}

export const SessionUserApp = async (data:InData)=>{
    const result = await account.createSession(
        data.id,
        data.secret
    );
    return result
}