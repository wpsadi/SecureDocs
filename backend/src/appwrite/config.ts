import sdk from "node-appwrite"
import "../utils/env"

const client = new sdk.Client()
    .setEndpoint(process.env.API_Endpoint as string) // Your API Endpoint
    .setProject(process.env.ProjectID as string) // Your project ID
    .setKey(process.env.APIkey as string); // Your secret API key


export const users = new sdk.Users(client);
export const account = new sdk.Account(client);
export const storage = new sdk.Storage(client);
export const dbs = new sdk.Databases(client);



export default client