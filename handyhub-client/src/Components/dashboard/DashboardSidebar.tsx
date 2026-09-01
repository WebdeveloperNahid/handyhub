"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { authClient } from "@/lib/auth-client";

type NavItem = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  // ১. Session থেকে User Role বের করা
  const role = !isPending ? (session?.user as { role?: string })?.role : null;

  // ২. Customer/User এর জন্য সাইডবার মেনু
  const userItems: NavItem[] = [
    { icon: House, label: "Overview", href: "/dashboard/user" },
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
    { icon: Boxes3, label: "Browse Services", href: "/all-services" },
  ];

  // ৩. Provider এর জন্য সাইডবার মেনু
  const providerItems: NavItem[] = [
    { icon: House, label: "Overview", href: "/dashboard/provider" },
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

  // ৪. Admin এর জন্য সাইডবার মেনু
  const adminItems: NavItem[] = [
    { icon: House, label: "Overview", href: "/dashboard/admin" },
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

  // ৫. রোল অনুযায়ী লিঙ্ক নির্বাচন
  const getNavDetails = () => {
    if (role === "admin") return { items: adminItems, label: "Admin Panel" };
    if (role === "provider")
      return { items: providerItems, label: "Provider Panel" };
    return { items: userItems, label: "Customer Panel" };
  };

  const { items, label: roleLabel } = getNavDetails();

  const renderLinks = (list: NavItem[]) => (
    <nav className="flex flex-col gap-1">
      {list.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]"
                : "text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            <span
              className={`absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-[#15803D] transition-opacity duration-200 dark:bg-[#22C55E] ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
            <item.icon
              className={`size-4 transition-colors duration-200 ${
                isActive
                  ? "text-[#15803D] dark:text-[#22C55E]"
                  : "text-slate-500 dark:text-zinc-400"
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const NavContent = (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
          {roleLabel}
        </p>
        {renderLinks(items)}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-slate-200 bg-white px-3 py-4 dark:border-zinc-800 dark:bg-[#18181B] lg:block">
        {NavContent}
      </aside>

      {/* Mobile Drawer */}
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <TfiMenuAlt />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading className="text-slate-900 dark:text-white">
                  HandyHub Navigation
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{NavContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}