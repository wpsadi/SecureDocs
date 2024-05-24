import { account } from "../config";
import "../../utils/env"

type InData = {
    email:string,
}

export const userFrgtPassApp= async (data:InData)=>{
    const result = await account.createRecovery(
        data.email,
        process.env.PasswordUpdateURL as string

    );
    return result
}