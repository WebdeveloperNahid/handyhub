"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./Themetoggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-services", label: "Browse Services" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  const dashboardHref = (() => {
    const role = session?.user?.role;
    if (role === "admin") return "/dashboard/admin";
    if (role === "provider") return "/dashboard/provider";
    return "/dashboard/user";
  })();

  if (pathname.includes('dashboard') || pathname.includes('signin') || pathname.includes('signup')) {
    return null;
  }

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#291C0E]/95 backdrop-blur transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl sm:px-6 px-4 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6E473B] text-[#E1D4C2]">
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

          <span className="text-lg font-semibold tracking-tight text-[#E1D4C2]">
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
                className={`relative py-1 text-sm font-medium transition-colors hover:text-[#A78D78] ${isActive
                  ? "border-b-2 border-[#A78D78] text-[#E1D4C2]"
                  : "text-[#BEB5A9]"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}

          {session?.user &&
            (() => {
              const isDashboardActive = pathname.startsWith("/dashboard");

              return (
                <Link
                  href={dashboardHref}
                  className={`relative py-1 text-sm font-medium transition-colors hover:text-[#A78D78] ${isDashboardActive
                    ? "border-b-2 border-[#A78D78] text-[#E1D4C2]"
                    : "text-[#BEB5A9]"
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
            <div className="h-9 w-24 animate-pulse rounded-md bg-white/10" />
          ) : session?.user ? (
            <button
              onClick={handleLogout}
              className="rounded-md border border-[#BEB5A9]/40 px-4 py-2 text-sm font-medium text-[#E1D4C2] transition-colors hover:border-[#A78D78] hover:bg-[#6E473B] hover:text-[#E1D4C2]"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                href="/signin"
                className={`text-sm font-medium transition-colors hover:text-[#A78D78] ${pathname === "/signin"
                  ? "text-[#E1D4C2]"
                  : "text-[#BEB5A9]"
                  }`}
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-md bg-[#6E473B] px-4 py-2 text-sm font-medium text-[#E1D4C2] transition-colors hover:bg-[#A78D78] hover:text-[#291C0E]"
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
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#E1D4C2] transition-colors hover:bg-[#6E473B]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#291C0E] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-[#A78D78] ${isActive
                    ? "text-[#E1D4C2]"
                    : "text-[#BEB5A9]"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {session?.user &&
              (() => {
                const isDashboardActive = pathname.startsWith("/dashboard");

                return (
                  <Link
                    href={dashboardHref}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-[#A78D78] ${isDashboardActive
                      ? "text-[#E1D4C2]"
                      : "text-[#BEB5A9]"
                      }`}
                  >
                    Dashboard
                  </Link>
                );
              })()}
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
            {session?.user ? (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="rounded-md border border-[#BEB5A9]/40 px-4 py-2 text-center text-sm font-medium text-[#E1D4C2] transition-colors hover:border-[#A78D78] hover:bg-[#6E473B]"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md border border-[#BEB5A9]/40 px-4 py-2 text-center text-sm font-medium text-[#E1D4C2] transition-colors hover:border-[#A78D78] hover:bg-[#6E473B]"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md bg-[#6E473B] px-4 py-2 text-center text-sm font-medium text-[#E1D4C2] transition-colors hover:bg-[#A78D78] hover:text-[#291C0E]"
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
