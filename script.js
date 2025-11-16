// =======================
// BLUE WORLD SOCIAL SCRIPT
// =======================

// -----------------------
// DARK MODE TOGGLE
// -----------------------
const darkModeToggle = document.getElementById("darkModeToggle");
function applyTheme() {
  const theme = localStorage.getItem("theme") || "dark";
  if (theme === "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
}

// Initialize theme on page load
applyTheme();

// Toggle event (if darkModeToggle exists)
if (darkModeToggle) {
  darkModeToggle.checked = localStorage.getItem("theme") === "light";
  darkModeToggle.addEventListener("change", () => {
    const newTheme = darkModeToggle.checked ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme();
  });
}

// -----------------------
// NAVIGATION BUTTONS
// -----------------------
document.querySelectorAll("button").forEach(btn => {
  // Buttons with hrefs are inline handled
  // No extra code needed here for navigation
});

// -----------------------
// POST CREATION (simple)
// -----------------------
const submitPostBtn = document.getElementById("submitPostBtn");
if (submitPostBtn) {
  submitPostBtn.addEventListener("click", () => {
    const textarea = document.getElem
