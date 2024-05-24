import { ID } from "node-appwrite";
import { users } from "../config";
import { getUserApp } from "./getUser";

type InData = {
    id : string
}

export const userLabelApp = async (data:InData)=>{
    const user = await getUserApp({id:data.id})
    return await users.updateLabels(data.id,["user"])
}