export function initThemeToggle(toggleButtonSelector = "#toggleTheme") {
  const toggleBtn = document.querySelector(toggleButtonSelector);
  if (!toggleBtn) return;

  const applySavedTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      toggleBtn.textContent = "☀️";
    } else {
      document.body.classList.remove("dark");
      toggleBtn.textContent = "🌙";
    }
  };

  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  applySavedTheme();
}
