"use client";

import { authClient } from "@/lib/auth-client";
import { FiBell, FiMenu } from "react-icons/fi";
import ThemeToggle from "../Themetoggle";

interface DashboardNavbarProps {
  onMenuClick?: () => void;
}

const DashboardNavbar = ({ onMenuClick }: DashboardNavbarProps) => {
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const role = (user as { role?: string })?.role;

  const roleLabel =
    role === "admin"
      ? "Admin"
      : role === "provider"
        ? "Provider"
        : "Customer";

  const userName = user?.name || "User";

  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        h-16
        border-b
        border-[#1C1917]/10
        bg-[#FAF9F7]/95
        backdrop-blur-md
        dark:border-white/10
        dark:bg-[#18181B]/95
        lg:left-64
      "
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button - Greenish Accent Theme */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open Menu"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-[#15803D]/10
              text-[#15803D]
              transition-all
              duration-200
              hover:bg-[#15803D]/20
              active:scale-95
              dark:bg-[#22C55E]/15
              dark:text-[#22C55E]
              dark:hover:bg-[#22C55E]/25
              lg:hidden
            "
          >
            <FiMenu size={20} />
          </button>

          <div>
            <p className="text-sm font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
              Dashboard
            </p>

            <p className="hidden text-[11px] font-medium text-[#15803D] dark:text-[#22C55E] sm:block">
              Manage your HandyHub account
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {/* Notification Button */}
          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              text-[#1C1917]/70
              transition-colors
              hover:bg-[#15803D]/10
              hover:text-[#15803D]
              dark:text-[#A1A1AA]
              dark:hover:bg-white/5
              dark:hover:text-[#22C55E]
            "
          >
            <FiBell size={18} />

            <span
              className="
                absolute
                right-2
                top-2
                h-1.5
                w-1.5
                rounded-full
                bg-[#15803D]
                dark:bg-[#22C55E]
              "
            />
          </button>

          <div className="hidden h-7 w-px bg-[#1C1917]/10 sm:block dark:bg-white/10" />

          {/* User Profile Info */}
          <div className="flex items-center gap-2.5">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-[#15803D]
                text-sm
                font-semibold
                text-white
                shadow-sm
                dark:bg-[#22C55E]
                dark:text-[#18181B]
              "
            >
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="hidden sm:block">
              <p className="max-w-32 truncate text-sm font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                {userName}
              </p>

              <p className="text-[11px] font-medium capitalize text-[#15803D] dark:text-[#22C55E]">
                {roleLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;