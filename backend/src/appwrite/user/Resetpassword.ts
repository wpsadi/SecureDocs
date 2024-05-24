import { account } from "../config";
import "../../utils/env"
import { getUserApp } from "./getUser";

type InData = {
    id:string,
    secret : string
    newPassword:string
}

export const userResetPassApp= async (data:InData)=>{
    const result = await account.updateRecovery(
        data.id,
        data.secret ,
        data.newPassword
    );
    return await getUserApp({
        id:data.id
    })
}