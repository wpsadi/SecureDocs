import { account } from "../config";

type InData = {
    email:string,
    password:string
}

export const userLoginApp= async (data:InData)=>{
    const result = await account.createEmailPasswordSession(
        data.email,
        data.password
    );
    return result
}