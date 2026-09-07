"use client";

import { useTheme } from "@/lib/core/theme";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    if (!mounted) {
        return (
            <div className="h-8 w-14 rounded-full bg-black/5 dark:bg-white/5" />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative flex h-8 w-14 items-center rounded-full border border-[#15803D]/30 bg-[#15803D]/10 px-1 transition-all duration-300 hover:border-[#15803D] dark:border-[#22C55E]/40 dark:bg-[#22C55E]/15 dark:hover:border-[#22C55E]"
        >
            <span
                className={`flex h-6 w-6 items-center justify-center rounded-full shadow-sm transition-all duration-300 ease-out ${
                    isDark
                        ? "translate-x-6 bg-[#22C55E] text-[#18181B]"
                        : "translate-x-0 bg-[#15803D] text-white"
                }`}
            >
                {isDark ? (
                    <FiMoon size={13} />
                ) : (
                    <FiSun size={13} />
                )}
            </span>
        </button>
    );
}