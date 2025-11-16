// auth.js
import { account } from "./appwrite.js";

export async function signIn(email, password) {
  try {
    await account.createEmailPasswordSession(email, password);
    alert("Signed in!");
  } catch (e) {
    alert("Sign in error: " + e.message);
  }
}

export async function signOut() {
  try {
    await account.deleteSession("current");
    alert("Signed out!");
  } catch (e) {
    alert("Sign out error: " + e.message);
  }
}


