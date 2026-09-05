"use client";

import { authClient } from "@/lib/auth-client";
import { FiBell } from "react-icons/fi";
import ThemeToggle from "../Themetoggle";

const DashboardNavbar = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const role = (user as { role?: string })?.role;

  const roleLabel =
    role === "admin" ? "Admin" : role === "provider" ? "Provider" : "Customer";

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
                border-black/10
                bg-[#FAF9F7]/95
                backdrop-blur-md
                dark:border-white/10
                dark:bg-[#18181B]/95
                lg:left-64
            "
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* Left */}
        <div>
          <p className="text-sm font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
            Dashboard
          </p>

          <p className="hidden text-[11px] text-[#1C1917]/60 dark:text-[#A1A1AA]/60 sm:block">
            Manage your HandyHub account
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

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
                            rounded-lg
                            text-[#F59E0B]
                            transition-colors
                            hover:bg-[#F59E0B]/10
                            dark:text-[#FBBF24]
                            dark:hover:bg-white/5
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
                                bg-[#F59E0B]
                                dark:bg-[#FBBF24]
                            "
            />
          </button>

          <div className="hidden h-7 w-px bg-black/10 sm:block dark:bg-white/10" />

          <div className="flex items-center gap-2.5">
            <div
              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-[#22C55E]
                                text-sm
                                font-semibold
                                text-[#18181B]
                            "
            >
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="hidden sm:block">
              <p className="max-w-32 truncate text-sm font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                {userName}
              </p>

              <p className="text-[11px] capitalize text-[#1C1917]/60 dark:text-[#A1A1AA]/60">
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
