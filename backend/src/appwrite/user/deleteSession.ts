import { ID } from "node-appwrite";
import { account, users } from "../config";

type InData = {
    id:string
    sessionId : string

}

export const DelSessionUserApp = async (data:InData)=>{
    const result = await users.deleteSession(
        data.id,
        data.sessionId
    );
    return result
}