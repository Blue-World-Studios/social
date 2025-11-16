// feed.js
import { databases, storage } from './appwrite.js';
import { getCurrentUser } from './auth.js';

const DB_ID = "socialdb";      // Make these in Appwrite
const POSTS_COL = "posts";
const BUCKET_ID = "images";

export async function createPost() {
  const user = await getCurrentUser();
  if (!user) return alert("Please sign in first.");

  const text = document.getElementById("postText").value.trim();
  const fileInput = document.getElementById("postFile");

  let imageId = null;

  if (fileInput.files.length > 0) {
    // Upload image
    const file = fileInput.files[0];
    const uploaded = await storage.createFile(BUCKET_ID, "unique()", file);
    imageId = uploaded.$id;
  }

  await databases.createDocument(DB_ID, POSTS_COL, "unique()", {
    userId: user.$id,
    username: user.name,
    text,
    imageId
  });

  alert("Posted!");
  document.getElementById("postText").value = "";
  fileInput.value = "";
}
