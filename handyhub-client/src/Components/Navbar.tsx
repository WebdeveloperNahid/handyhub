"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./Themetoggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Browse Services" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname(); // অ্যাক্টিভ রাউট ট্র্যাক করার জন্য

  const dashboardHref = (() => {
    const role = session?.user?.role;
    if (role === "admin") return "/dashboard/admin";
    if (role === "provider") return "/dashboard/provider";
    return "/dashboard/user";
  })();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#FAF9F7]/95 backdrop-blur transition-colors dark:border-white/10 dark:bg-[#18181B]/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#15803D] text-white dark:bg-[#22C55E]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-[#1C1917] dark:text-[#F4F4F5]">
            HandyHub
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors hover:text-[#15803D] dark:hover:text-[#22C55E] ${
                  isActive
                    ? "text-[#15803D] dark:text-[#22C55E] border-b-2 border-[#15803D] dark:border-[#22C55E]"
                    : "text-[#1C1917]/70 dark:text-[#A1A1AA]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {session?.user && (() => {
            const isDashboardActive = pathname.startsWith("/dashboard");
            return (
              <Link
                href={dashboardHref}
                className={`relative py-1 text-sm font-medium transition-colors hover:text-[#15803D] dark:hover:text-[#22C55E] ${
                  isDashboardActive
                    ? "text-[#15803D] dark:text-[#22C55E] border-b-2 border-[#15803D] dark:border-[#22C55E]"
                    : "text-[#1C1917]/70 dark:text-[#A1A1AA]"
                }`}
              >
                Dashboard
              </Link>
            );
          })()}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-black/5 dark:bg-white/10" />
          ) : session?.user ? (
            <button
              onClick={handleLogout}
              className="rounded-md border border-black/10 px-4 py-2 text-sm font-medium text-[#1C1917] transition-colors hover:border-red-300 hover:text-red-600 dark:border-white/10 dark:text-[#F4F4F5] dark:hover:border-red-400 dark:hover:text-red-400"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                href="/signin"
                className={`text-sm font-medium transition-colors hover:text-[#15803D] dark:hover:text-[#22C55E] ${
                  pathname === "/signin"
                    ? "text-[#15803D] dark:text-[#22C55E]"
                    : "text-[#1C1917] dark:text-[#F4F4F5]"
                }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-[#15803D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#116830] dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#16A34A]"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#1C1917] dark:text-[#F4F4F5]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-black/10 bg-[#FAF9F7] px-4 py-4 dark:border-white/10 dark:bg-[#18181B] md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#15803D] dark:text-[#22C55E]"
                      : "text-[#1C1917]/80 dark:text-[#A1A1AA]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {session?.user && (() => {
              const isDashboardActive = pathname.startsWith("/dashboard");
              return (
                <Link
                  href={dashboardHref}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    isDashboardActive
                      ? "text-[#15803D] dark:text-[#22C55E]"
                      : "text-[#1C1917]/80 dark:text-[#A1A1AA]"
                  }`}
                >
                  Dashboard
                </Link>
              );
            })()}
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-black/10 pt-4 dark:border-white/10">
            {session?.user ? (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="rounded-md border border-black/10 px-4 py-2 text-center text-sm font-medium text-[#1C1917] dark:border-white/10 dark:text-[#F4F4F5]"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md border border-black/10 px-4 py-2 text-center text-sm font-medium text-[#1C1917] dark:border-white/10 dark:text-[#F4F4F5]"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md bg-[#15803D] px-4 py-2 text-center text-sm font-medium text-white dark:bg-[#22C55E] dark:text-[#18181B]"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}



