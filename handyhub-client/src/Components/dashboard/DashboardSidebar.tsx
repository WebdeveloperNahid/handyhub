"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  Person,
  Plus,
  ListCheck,
  Calendar,
  Heart,
  Briefcase,
  Boxes3,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { TfiMenuAlt } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

type NavItem = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const role = !isPending
    ? (session?.user as { role?: string })?.role
    : null;

  const userItems: NavItem[] = [
    {
      icon: House,
      label: "Overview",
      href: "/dashboard/user",
    },
    {
      icon: ListCheck,
      label: "My Requests",
      href: "/dashboard/user/my-requests",
    },
    {
      icon: Heart,
      label: "Saved Providers",
      href: "/dashboard/user/saved-providers",
    },
    {
      icon: Boxes3,
      label: "Browse Services",
      href: "/all-services",
    },
  ];

  const providerItems: NavItem[] = [
    {
      icon: House,
      label: "Overview",
      href: "/dashboard/provider",
    },
    {
      icon: Briefcase,
      label: "My Services",
      href: "/dashboard/provider/my-services",
    },
    {
      icon: Plus,
      label: "Add Service",
      href: "/dashboard/provider/add-service",
    },
    {
      icon: Calendar,
      label: "Availability",
      href: "/dashboard/provider/availability",
    },
    {
      icon: ListCheck,
      label: "Incoming Requests",
      href: "/dashboard/provider/incoming-requests",
    },
    {
      icon: Briefcase,
      label: "Active Jobs",
      href: "/dashboard/provider/active-jobs",
    },
  ];

  const adminItems: NavItem[] = [
    {
      icon: House,
      label: "Overview",
      href: "/dashboard/admin",
    },
    {
      icon: Person,
      label: "Manage Users",
      href: "/dashboard/admin/manage-users",
    },
    {
      icon: Person,
      label: "Manage Providers",
      href: "/dashboard/admin/manage-providers",
    },
    {
      icon: Boxes3,
      label: "Manage Categories",
      href: "/dashboard/admin/manage-categories",
    },
  ];

  const getNavDetails = () => {
    if (role === "admin") {
      return {
        items: adminItems,
        label: "Admin Panel",
      };
    }

    if (role === "provider") {
      return {
        items: providerItems,
        label: "Provider Panel",
      };
    }

    return {
      items: userItems,
      label: "Customer Panel",
    };
  };

  const { items, label: roleLabel } = getNavDetails();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signin");
    router.refresh();
  };

  const renderLinks = (list: NavItem[]) => (
    <nav className="flex flex-col gap-1">
      {list.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard/user" &&
            item.href !== "/dashboard/provider" &&
            item.href !== "/dashboard/admin" &&
            pathname.startsWith(`${item.href}/`));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
              ? "bg-[#6E473B]/10 text-[#6E473B] dark:bg-[#A78D78]/10 dark:text-[#A78D78]"
              : "text-[#6E473B]/75 hover:bg-[#6E473B]/5 hover:text-[#291C0E] dark:text-[#C5B8AA]/70 dark:hover:bg-white/5 dark:hover:text-[#E1D4C2]"
              }`}
          >
            <span
              className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[#6E473B] transition-opacity dark:bg-[#A78D78] ${isActive
                ? "opacity-100"
                : "opacity-0"
                }`}
            />

            <item.icon
              className={`size-4 ${isActive
                ? "text-[#6E473B] dark:text-[#A78D78]"
                : "text-[#6E473B]/50 dark:text-[#C5B8AA]/50"
                }`}
            />

            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const NavContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <Link
        href="/"
        className="mb-8 flex items-center px-3"
      >
        <span className="text-xl font-bold tracking-tight text-[#291C0E] dark:text-[#E1D4C2]">
          Handy
          <span className="text-[#6E473B] dark:text-[#A78D78]">
            Hub
          </span>
        </span>
      </Link>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto pr-1">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6E473B]/45 dark:text-[#C5B8AA]/40">
          {roleLabel}
        </p>

        {renderLinks(items)}
      </div>

      {/* Logout */}
      <div className="mt-4 border-t border-[#6E473B]/10 pt-4 dark:border-white/10">
        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#6E473B]/75 transition-all hover:bg-red-500/10 hover:text-red-600 dark:text-[#C5B8AA]/70 dark:hover:text-red-400"
        >
          <FiLogOut
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />

          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="
            hidden
            lg:block
            h-screen
            w-full
            border-r
            border-[#6E473B]/15
            bg-[#E8DDCE]
            px-3
            py-5
            dark:border-white/10
            dark:bg-[#181411]
          "
      >
        {NavContent}
      </aside>

      {/* Mobile Menu */}
      <div className="fixed left-4 top-20 z-50 lg:hidden">
        <Drawer>
          <Button
            className="h-10 w-10 min-w-10 rounded-xl border border-[#6E473B]/15 bg-[#E8DDCE] p-0 shadow-md dark:border-white/10 dark:bg-[#241B17]"
            variant="secondary"
          >
            <TfiMenuAlt className="size-5 text-[#6E473B] dark:text-[#A78D78]" />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />

                <Drawer.Header>
                  <Drawer.Heading className="text-[#291C0E] dark:text-[#E1D4C2]">
                    HandyHub
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body className="bg-[#E8DDCE] dark:bg-[#181411]">
                  {NavContent}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}