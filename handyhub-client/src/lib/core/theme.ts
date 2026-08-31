"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // ১. মাউন্ট হওয়ার পর localStorage ও সিস্টেম সেটিংস চেক করা
    const stored = localStorage.getItem("handyhub-theme") as Theme | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    
    // ২. শুধুমাত্র একবারই মাউন্ট স্টেট ট্রু করা
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("handyhub-theme", next);
  };

  return { theme, toggleTheme, mounted };
}