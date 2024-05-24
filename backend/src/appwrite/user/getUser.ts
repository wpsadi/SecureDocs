import { ID } from "node-appwrite";
import { users } from "../config";

type InData = {
  id: string;
};

export const getUserApp = async (data: InData,passwordHidden:boolean=true) => {
  const userInfo: any = await users.get(
    data.id // userId
  );
  if (passwordHidden !== true){
    return userInfo
  }
  const response  = {
    ...userInfo,
    password: "*".repeat(userInfo.password.length),
  }
  return response;
};
