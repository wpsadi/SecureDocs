import { account } from "../config";

type InData = {
    id : string
    Name : string
}

export const userNameUpdateApp= async (data:InData)=>{
    const result = await account.updateVerification(
        data.id,
        data.Name
    );
    return result
}