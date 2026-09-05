"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();
  if (
    pathName.includes("dashboard") ||
    pathName.includes("signin") ||
    pathName.includes("signup")
  ) {
    return null;
  }
  return (
    <footer className="bg-[#18181B] text-[#F4F4F5]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#22C55E] text-[#18181B]">
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

              <span className="text-lg font-semibold tracking-tight">
                HandyHub
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#A1A1AA]">
              Find trusted local services and connect with reliable
              professionals for your everyday needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#F4F4F5]">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#A1A1AA] transition-colors hover:text-[#FBBF24]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/explore"
                  className="text-[#A1A1AA] transition-colors hover:text-[#FBBF24]"
                >
                  Browse Services
                </Link>
              </li>

              <li>
                <Link
                  href="/signin"
                  className="text-[#A1A1AA] transition-colors hover:text-[#FBBF24]"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-[#F4F4F5]">Services</h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <span className="text-[#A1A1AA]">Home Cleaning</span>
              </li>

              <li>
                <span className="text-[#A1A1AA]">AC Repair</span>
              </li>

              <li>
                <span className="text-[#A1A1AA]">Plumbing</span>
              </li>

              <li>
                <span className="text-[#A1A1AA]">Electrical</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <p className="text-[#A1A1AA]">
              © 2026 HandyHub. All rights reserved.
            </p>

            <div className="flex gap-5">
              <Link
                href="/privacy"
                className="text-[#A1A1AA] transition-colors hover:text-[#FBBF24]"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="text-[#A1A1AA] transition-colors hover:text-[#FBBF24]"
              >
                Terms
              </Link>

              <Link
                href="/contact"
                className="text-[#A1A1AA] transition-colors hover:text-[#FBBF24]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
