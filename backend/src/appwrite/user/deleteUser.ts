import { ID } from "node-appwrite";
import { users } from "../config";

type InData = {
    id : string
}

export const deleteUserApp = async (data:InData)=>{
    return await users.delete(
        data.id // userId
    );
}