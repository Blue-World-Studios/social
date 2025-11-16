// appwrite.js
import { Client, Account, Databases, Storage } from "https://cdn.jsdelivr.net/npm/appwrite@13.0.0/dist/appwrite.esm.js";

const client = new Client()
  .setEndpoint("https://tor.cloud.appwrite.io/v1")
  .setProject("69193dc300018a78bd84");

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database IDs (you create these in Appwrite console)
export const DB_ID = "6919e49d0014815f9b50";
export const POSTS_COL = "6919e60e003677818ace";
export const BUCKET_ID = "6919e5e800113bbc7df0";


