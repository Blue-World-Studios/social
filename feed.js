// feed.js
import { databases, storage, DB_ID, POSTS_COL, BUCKET_ID, account } from "./appwrite.js";
import { ID } from "https://cdn.jsdelivr.net/npm/appwrite@13.0.0/dist/appwrite.esm.js";

let selectedFile = null;

// File select + preview
export function handleFileSelect(e) {
  const file = e.target.files?.[0];
  const fileNameEl = document.getElementById("fileName");
  const preview = document.getElementById("postPreview");

  if (!file) {
    selectedFile = null;
    fileNameEl.textContent = "";
    preview.innerHTML = "";
    return;
  }

  selectedFile = file;
  fileNameEl.textContent = file.name;

  const reader = new FileReader();
  reader.onload = (ev) => {
    preview.innerHTML = `<img src="${ev.target.result}" style="max-width:100%;border-radius:8px;">`;
  };
  reader.readAsDataURL(file);
}

// Create a post
export async function createPost() {
  const user = await account.get().catch(() => null);
  if (!user) return alert("Please sign in!");

  const text = document.getElementById("postText").value;
  let imageId = null;
  let imageUrl = null;

  // Upload image
  if (selectedFile) {
    imageId = ID.unique();
    await storage.createFile(BUCKET_ID, imageId, selectedFile);
    imageUrl = storage.getFilePreview(BUCKET_ID, imageId);
  }

  // Save post
  await databases.createDocument(DB_ID, POSTS_COL, ID.unique(), {
    userId: user.$id,
    userEmail: user.email,
    text,
    image: imageUrl,
    createdAt: Date.now(),
  });

  document.getElementById("postText").value = "";
  document.getElementById("postFile").value = "";
  document.getElementById("fileName").textContent = "";
  document.getElementById("postPreview").innerHTML = "";
  selectedFile = null;

  loadFeed();
}

// Load posts feed
export async function loadFeed() {
  const feed = document.getElementById("feedContainer");
  feed.innerHTML = "Loading...";

  const res = await databases.listDocuments(DB_ID, POSTS_COL, {
    orderBy: "createdAt",
    orderType: "DESC",
  });

  feed.innerHTML = "";

  res.documents.forEach((doc) => {
    const div = document.createElement("div");
    div.className = "postCard";

    div.innerHTML = `
      <p><strong>${doc.userEmail}</strong></p>
      <p>${doc.text}</p>
      ${doc.image ? `<img src="${doc.image}" />` : ""}
    `;

    feed.appendChild(div);
  });
}
