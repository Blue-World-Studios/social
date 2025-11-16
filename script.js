// =======================
// APPWRITE INIT
// =======================
import { Client, Databases, Storage, Account } from "https://cdn.jsdelivr.net/npm/appwrite@13.0.0/+esm";

const client = new Client()
  .setEndpoint("https://tor.cloud.appwrite.io/v1")
  .setProject("69193dc300018a78bd84"); // your project

const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);

// IDs you provided
const DB_ID = "6919e49d0014815f9b50";
const POSTS = "posts";
const IMAGES_BUCKET = "images";

// =======================
// DARK MODE
// =======================
const darkModeToggle = document.getElementById("darkModeToggle");

function applyTheme() {
  const theme = localStorage.getItem("theme") || "dark";
  document.body.classList.toggle("light", theme === "light");
}

applyTheme();

if (darkModeToggle) {
  darkModeToggle.checked = localStorage.getItem("theme") === "light";
  darkModeToggle.addEventListener("change", () => {
    const newTheme = darkModeToggle.checked ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme();
  });
}

// =======================
// GET CURRENT USER
// =======================
async function getUser() {
  try {
    return await account.get();
  } catch (err) {
    return null;
  }
}

// =======================
// CREATE POST
// =======================
const submitPostBtn = document.getElementById("submitPostBtn");

if (submitPostBtn) {
  submitPostBtn.addEventListener("click", async () => {
    const text = document.getElementById("postContent");
    const imageInput = document.getElementById("postImage");

    if (!text || text.value.trim() === "") {
      alert("Write something to post!");
      return;
    }

    const user = await getUser();
    if (!user) {
      alert("You must sign in first!");
      return;
    }

    let imageId = null;

    // Upload Image (optional)
    if (imageInput && imageInput.files.length > 0) {
      try {
        const uploaded = await storage.createFile(
          IMAGES_BUCKET,
          "unique()", 
          imageInput.files[0]
        );
        imageId = uploaded.$id;
      } catch (err) {
        console.error(err);
        alert("Image upload failed");
      }
    }

    try {
      await databases.createDocument(DB_ID, POSTS, "unique()", {
        content: text.value.trim(),
        imageId: imageId,
        userId: user.$id,
        username: user.name || "Anonymous",
        timestamp: Date.now(),
        likes: []
      });

      alert("Posted!");
      text.value = "";
      if (imageInput) imageInput.value = "";

    } catch (err) {
      console.error(err);
      alert("Failed to post");
    }
  });
}

// =======================
// FETCH POSTS (for feed)
// =======================
async function loadFeed() {
  const feed = document.getElementById("feed");
  if (!feed) return;

  try {
    const res = await databases.listDocuments(DB_ID, POSTS, [
      // newest first
      Appwrite.Query.orderDesc("timestamp")
    ]);

    feed.innerHTML = "";

    res.documents.forEach(post => {
      const div = document.createElement("div");
      div.className = "post";

      div.innerHTML = `
        <p class="username">@${post.username}</p>
        <p>${post.content}</p>
        ${post.imageId ? `<img src="https://tor.cloud.appwrite.io/v1/storage/buckets/${IMAGES_BUCKET}/files/${post.imageId}/view?project=69193dc300018a78bd84" />` : ""}
      `;

      feed.appendChild(div);
    });

  } catch (err) {
    console.error(err);
  }
}

loadFeed();

// =======================
// DEBUG
// =======================
console.log("Bloop script loaded ⚡");

