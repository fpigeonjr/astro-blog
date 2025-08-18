import { describe, it, expect, beforeEach, vi } from "vitest";
import { getByRole } from "@testing-library/dom";
import { userEvent } from "@testing-library/user-event";

// Mock theme utilities
vi.mock("../src/utils/theme.js", async () => {
  const original = await vi.importActual("./theme-mock.js");
  return original;
});

// Shared test utilities
function createThemeUtilities(isDark, updateTheme) {
  function updateIcon(button) {
    if (isDark()) {
      button.setAttribute("aria-label", "Switch to light mode");
    } else {
      button.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  function toggleTheme() {
    const isCurrentlyDark = isDark();
    const newTheme = isCurrentlyDark ? "light" : "dark";

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }

    updateTheme();

    const desktopToggle = document.getElementById("theme-toggle");
    const mobileToggle = document.getElementById("mobile-theme-toggle");

    if (desktopToggle) updateIcon(desktopToggle);
    if (mobileToggle) updateIcon(mobileToggle);
  }

  return { updateIcon, toggleTheme };
}

describe("Theme Toggle Functionality", () => {
  let container;
  let user;

  beforeEach(() => {
    // Clear DOM
    document.body.innerHTML = "";
    // Clear localStorage
    localStorage.clear();
    // Reset document theme
    document.documentElement.removeAttribute("data-theme");

    // Setup container
    container = document.createElement("div");
    document.body.appendChild(container);

    // Setup user-event
    user = userEvent.setup();
  });

  it("should create desktop theme toggle with correct structure", () => {
    // Create desktop theme toggle
    container.innerHTML = `
      <button
        id="theme-toggle"
        type="button"
        aria-label="Toggle dark mode"
        class="theme-toggle"
      >
        <svg class="sun-icon" width="32" height="32">
          <circle cx="12" cy="12" r="5"></circle>
        </svg>
        <svg class="moon-icon" width="32" height="32">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    `;

    const toggle = getByRole(container, "button", {
      name: /toggle dark mode/i,
    });
    expect(toggle).toBeTruthy();
    expect(toggle.id).toBe("theme-toggle");

    const sunIcon = container.querySelector(".sun-icon");
    const moonIcon = container.querySelector(".moon-icon");
    expect(sunIcon).toBeTruthy();
    expect(moonIcon).toBeTruthy();
  });

  it("should create mobile theme toggle with correct structure", () => {
    // Create mobile theme toggle
    container.innerHTML = `
      <button
        id="mobile-theme-toggle"
        type="button"
        aria-label="Toggle dark mode"
        class="theme-toggle"
      >
        <svg class="sun-icon" width="32" height="32">
          <circle cx="12" cy="12" r="5"></circle>
        </svg>
        <svg class="moon-icon" width="32" height="32">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    `;

    const toggle = getByRole(container, "button", {
      name: /toggle dark mode/i,
    });
    expect(toggle).toBeTruthy();
    expect(toggle.id).toBe("mobile-theme-toggle");
  });

  it("should toggle theme when clicked", async () => {
    // Setup theme toggle functionality
    container.innerHTML = `
      <button
        id="theme-toggle"
        type="button"
        aria-label="Toggle dark mode"
        class="theme-toggle"
      >
        <svg class="sun-icon"></svg>
        <svg class="moon-icon"></svg>
      </button>
    `;

    // Import and set up the theme toggle logic
    const { updateTheme, isDark } = await import("./theme-mock.js");
    const { updateIcon, toggleTheme } = createThemeUtilities(
      isDark,
      updateTheme
    );

    const toggle = container.querySelector("#theme-toggle");

    // Initial state should be light mode (default)
    updateTheme();
    updateIcon(toggle);
    expect(toggle.getAttribute("aria-label")).toBe("Switch to dark mode");

    // Click to switch to dark mode
    toggle.addEventListener("click", toggleTheme);
    await user.click(toggle);

    expect(localStorage.getItem("theme")).toBe("dark");
    expect(toggle.getAttribute("aria-label")).toBe("Switch to light mode");

    // Click again to switch back to light mode
    await user.click(toggle);

    expect(localStorage.getItem("theme")).toBe("light");
    expect(toggle.getAttribute("aria-label")).toBe("Switch to dark mode");
  });

  it("should update both desktop and mobile toggles simultaneously", async () => {
    // Setup both toggles
    container.innerHTML = `
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">
        <svg class="sun-icon"></svg>
        <svg class="moon-icon"></svg>
      </button>
      <button id="mobile-theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">
        <svg class="sun-icon"></svg>
        <svg class="moon-icon"></svg>
      </button>
    `;

    const { updateTheme, isDark } = await import("./theme-mock.js");
    const { updateIcon, toggleTheme } = createThemeUtilities(
      isDark,
      updateTheme
    );

    const desktopToggle = container.querySelector("#theme-toggle");
    const mobileToggle = container.querySelector("#mobile-theme-toggle");

    // Initial setup
    updateTheme();
    updateIcon(desktopToggle);
    updateIcon(mobileToggle);

    expect(desktopToggle.getAttribute("aria-label")).toBe(
      "Switch to dark mode"
    );
    expect(mobileToggle.getAttribute("aria-label")).toBe("Switch to dark mode");

    // Set up click handlers
    desktopToggle.addEventListener("click", toggleTheme);
    mobileToggle.addEventListener("click", toggleTheme);

    // Click desktop toggle using user-event
    await user.click(desktopToggle);

    expect(desktopToggle.getAttribute("aria-label")).toBe(
      "Switch to light mode"
    );
    expect(mobileToggle.getAttribute("aria-label")).toBe(
      "Switch to light mode"
    );

    // Click mobile toggle using user-event
    await user.click(mobileToggle);

    expect(desktopToggle.getAttribute("aria-label")).toBe(
      "Switch to dark mode"
    );
    expect(mobileToggle.getAttribute("aria-label")).toBe("Switch to dark mode");
  });

  it("should respect system color scheme preference", async () => {
    // Mock system preference for dark mode
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { getThemePreference } = await import("./theme-mock.js");

    // Should default to dark when system preference is dark
    expect(getThemePreference()).toBe("dark");

    // Mock system preference for light mode
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === "(prefers-color-scheme: light)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    // Clear localStorage to test system preference
    localStorage.clear();
    expect(getThemePreference()).toBe("light");
  });

  it("should handle keyboard interactions for accessibility", async () => {
    container.innerHTML = `
      <button
        id="theme-toggle"
        type="button"
        aria-label="Toggle dark mode"
        class="theme-toggle"
      >
        <svg class="sun-icon"></svg>
        <svg class="moon-icon"></svg>
      </button>
    `;

    const { updateTheme, isDark } = await import("./theme-mock.js");
    const { updateIcon, toggleTheme } = createThemeUtilities(
      isDark,
      updateTheme
    );

    const toggle = container.querySelector("#theme-toggle");
    toggle.addEventListener("click", toggleTheme);

    // Initial setup
    updateTheme();
    updateIcon(toggle);
    expect(toggle.getAttribute("aria-label")).toBe("Switch to dark mode");

    // Focus the button and press Enter
    toggle.focus();
    await user.keyboard("{Enter}");

    expect(localStorage.getItem("theme")).toBe("dark");
    expect(toggle.getAttribute("aria-label")).toBe("Switch to light mode");

    // Press Space to toggle again
    await user.keyboard(" ");

    expect(localStorage.getItem("theme")).toBe("light");
    expect(toggle.getAttribute("aria-label")).toBe("Switch to dark mode");
  });
});
