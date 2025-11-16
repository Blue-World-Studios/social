// appwrite.js
import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // "https://tor.cloud.appwrite.io/v1"
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // "69193dc300018a78bd84"

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

