import {Query } from "node-appwrite";
import { users } from "../config";

type InData = {
    email : string
}
export type outDataFromGetUserByEmail = {
    total:number,
    users :Array<object>
} 

export const getUserByEmailApp = async (data:InData):Promise<outDataFromGetUserByEmail>=>{
    return await users.list(
       [ Query.equal("email",data.email)]
    );
}