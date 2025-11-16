// appwrite.js
import { Client, Account, Databases, Storage } from "https://esm.run/appwrite";

const client = new Client()
  .setEndpoint("https://tor.cloud.appwrite.io/v1") // Your endpoint
  .setProject("69193dc300018a78bd84");             // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client };


