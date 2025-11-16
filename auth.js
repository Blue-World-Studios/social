// auth.js
import { account } from './appwrite.js';

export let currentUser = null;

export async function signIn(email, password) {
  try {
    await account.createSession(email, password);
    currentUser = await account.get();
    alert(`Signed in as ${currentUser.email}`);
    document.getElementById('userDisplay').textContent = currentUser.email;
  } catch (e) {
    console.error(e);
    alert("Sign in error: " + e.message);
  }
}

export async function signOut() {
  try {
    await account.deleteSession('current');
    currentUser = null;
    alert("Signed out!");
    document.getElementById('userDisplay').textContent = '';
  } catch (e) {
    console.error(e);
    alert("Sign out error: " + e.message);
  }
}

// On page load, check if user is logged in
(async () => {
  try {
    currentUser = await account.get();
    document.getElementById('userDisplay').textContent = currentUser.email;
  } catch (e) {
    currentUser = null;
  }
})();
