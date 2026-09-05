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

  const role = !isPending ? (session?.user as { role?: string })?.role : null;

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
            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-[#F59E0B]/10 text-[#F59E0B] dark:bg-[#FBBF24]/10 dark:text-[#FBBF24]"
                : "text-[#1C1917]/70 hover:bg-black/5 hover:text-[#1C1917] dark:text-[#A1A1AA]/70 dark:hover:bg-white/5 dark:hover:text-[#F4F4F5]"
            }`}
          >
            <span
              className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[#F59E0B] transition-opacity dark:bg-[#FBBF24] ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />

            <item.icon
              className={`size-4 ${
                isActive
                  ? "text-[#F59E0B] dark:text-[#FBBF24]"
                  : "text-[#1C1917]/50 dark:text-[#A1A1AA]/50"
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
      <Link href="/" className="mb-8 flex items-center px-3">
        <span className="text-xl font-bold tracking-tight text-[#1C1917] dark:text-[#F4F4F5]">
          Handy
          <span className="text-[#F59E0B] dark:text-[#FBBF24]">Hub</span>
        </span>
      </Link>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto pr-1">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1C1917]/45 dark:text-[#A1A1AA]/40">
          {roleLabel}
        </p>

        {renderLinks(items)}
      </div>

      {/* Logout */}
      <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1C1917]/70 transition-all hover:bg-red-500/10 hover:text-red-600 dark:text-[#A1A1AA]/70 dark:hover:text-red-400"
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
            border-black/10
            bg-white
            px-3
            py-5
            dark:border-white/10
            dark:bg-[#18181B]
          "
      >
        {NavContent}
      </aside>

      {/* Mobile Menu */}
      <div className="fixed left-4 top-20 z-50 lg:hidden">
        <Drawer>
          <Button
            className="h-10 w-10 min-w-10 rounded-xl border border-black/10 bg-white p-0 shadow-md dark:border-white/10 dark:bg-[#202023]"
            variant="secondary"
          >
            <TfiMenuAlt className="size-5 text-[#F59E0B] dark:text-[#FBBF24]" />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />

                <Drawer.Header>
                  <Drawer.Heading className="text-[#1C1917] dark:text-[#F4F4F5]">
                    HandyHub
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body className="bg-white dark:bg-[#18181B]">
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
