"use client";

import { useTheme } from "@/lib/core/theme";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    if (!mounted) {
        return (
            <div className="h-8 w-14 rounded-full bg-white/10" />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative flex h-8 w-14 items-center rounded-full border border-[#A78D78]/30 bg-[#6E473B]/40 px-1 transition-all duration-300 hover:border-[#A78D78]/60"
        >
            <span
                className={`flex h-6 w-6 items-center justify-center rounded-full shadow-sm transition-all duration-300 ease-out ${
                    isDark
                        ? "translate-x-6 bg-[#A78D78] text-[#291C0E]"
                        : "translate-x-0 bg-[#E1D4C2] text-[#291C0E]"
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