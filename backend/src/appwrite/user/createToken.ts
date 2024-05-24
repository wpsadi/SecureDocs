import { ID } from "node-appwrite";
import { users } from "../config";

type InData = {
    id : string
}

export const TokenUserApp = async (data:InData)=>{
    const TokenData = await users.createToken(
        data.id // userId
    );
    return TokenData
}