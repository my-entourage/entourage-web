"use client";

import { useTheme } from "./ThemeProvider";
import { Icon } from "./Icon";

/**
 * Theme toggle button with animated sun/moon icons
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Icon
        icon={theme === "light" ? "line-md:sun-rising-loop" : "line-md:moon-loop"}
        size={20}
      />
    </button>
  );
}
