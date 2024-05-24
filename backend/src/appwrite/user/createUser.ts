import { ID } from "node-appwrite";
import client, { users } from "../config";
import { userLabelApp } from "./setUserLabel";
import { getUserApp } from "./getUser";
import { getUserByEmailApp, outDataFromGetUserByEmail } from "./getUserWithEmail";
import { deleteUserApp } from "./deleteUser";
import { TokenUserApp } from "./createToken";
import { userEmailVerificationLinkGenerationApp } from "./sendEmailVerification";

type userData = {
    email:string,
    password:string,
    name:string

}

export const newUserApp = async (data:userData)=>{
    // checking if email is already used and verified
    const checkExistingUser:outDataFromGetUserByEmail = await getUserByEmailApp({
        email:data.email
    })

    if (checkExistingUser.total !== 0 ){
        const alreadyUser:any = checkExistingUser.users[0]
        if (alreadyUser.emailVerification === true){
            throw new Error("Email already in use")
        }
        await deleteUserApp({
            id:alreadyUser.$id
        })
    }

   



    const userID = ID.unique()
    const user = await users.create(
        userID,
        (data.email).trim(),
    )
    await users.updatePassword(userID,(data.password).trim())
    await users.updateName(userID,(data.name).trim())
    await userLabelApp({
        id:userID
    })

    await userEmailVerificationLinkGenerationApp({
        id:userID
    })


    

    return await getUserApp({
        id:userID
    })
}