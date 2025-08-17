/**
 * Mock theme utility functions for testing
 */

export function getThemePreference() {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function setTheme(theme) {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

export function updateTheme() {
  const themePreference = getThemePreference();
  setTheme(themePreference);

  if (typeof localStorage !== "undefined") {
    localStorage.setItem("theme", themePreference);
  }

  return themePreference;
}

export function isDark() {
  return getThemePreference() === "dark";
}