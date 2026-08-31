"use client";

import { useTheme } from "@/lib/core/theme";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="h-8 w-14 rounded-full bg-black/5" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex h-8 w-14 items-center rounded-full border border-black/10 bg-black/5 px-1 transition-colors duration-300 dark:border-white/10 dark:bg-white/10"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-[#15803D] text-white shadow-sm transition-transform duration-300 ease-out dark:bg-[#22C55E] ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? <FiMoon size={13} /> : <FiSun size={13} />}
      </span>
    </button>
  );
}