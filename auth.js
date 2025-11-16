// auth.js
import { account } from './appwrite.js';

// Sign in
export async function signIn(email, password) {
  try {
    await account.createEmailSession(email, password);
    alert("Signed in!");
  } catch (e) {
    console.error(e);
    alert("Sign in failed: " + e.message);
  }
}

// Sign out
export async function signOut() {
  try {
    await account.deleteSession('current');
    alert("Signed out!");
  } catch (e) {
    console.error(e);
    alert("Sign out failed: " + e.message);
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}

