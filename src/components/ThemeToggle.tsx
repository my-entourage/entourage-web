"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { Icon } from "./Icon";

/**
 * Theme toggle button with animated sun/moon icons
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center text-black dark:text-white border border-black dark:border-white bg-transparent transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Icon
        icon={theme === "light" ? "line-md:sun-rising-loop" : "line-md:moon-loop"}
        size={18}
      />
    </button>
  );
}
