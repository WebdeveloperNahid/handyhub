"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  Layers,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
} from "lucide-react";
import { getAdminStats, AdminStats } from "@/lib/api/admin_api/getAdminStats";
import { getUsers } from "@/lib/api/admin_api/GetAllUser";
import { getAllServices } from "@/lib/api/admin_api/manageServiceApi";

interface RecentUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface RecentService {
  _id: string;
  title: string;
  price: number;
  category?: string;
  status: string;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [pendingServices, setPendingServices] = useState<RecentService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, usersRes, servicesRes] = await Promise.allSettled([
        getAdminStats(),
        getUsers(),
        getAllServices(),
      ]);

      if (statsRes.status === "fulfilled" && statsRes.value?.data) {
        setStats(statsRes.value.data);
      }

      if (usersRes.status === "fulfilled" && usersRes.value?.data) {
        const uList = Array.isArray(usersRes.value.data) ? usersRes.value.data : [];
        setRecentUsers(uList.slice(-5).reverse());
      }

      if (servicesRes.status === "fulfilled" && servicesRes.value?.data) {
        const sList: RecentService[] = Array.isArray(servicesRes.value.data)
          ? servicesRes.value.data
          : [];
        setPendingServices(sList.filter((s) => s.status === "pending").slice(0, 5));
      }
    } catch {
      // Ignore network errors gracefully
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const statCards = [
    {
      label: "Total Registered Users",
      value: stats?.totalUsers ?? 0,
      subtext: `${stats?.totalCustomers ?? 0} customers · ${stats?.totalProviders ?? 0} providers`,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
      href: "/dashboard/admin/manage-users",
    },
    {
      label: "Pending Service Approvals",
      value: stats?.pendingServices ?? 0,
      subtext: "Require admin verification",
      icon: AlertTriangle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10 dark:bg-amber-500/20",
      href: "/dashboard/admin/manage-services",
    },
    {
      label: "Active Services Listed",
      value: stats?.activeServices ?? 0,
      subtext: `Out of ${stats?.totalServices ?? 0} total listings`,
      icon: Layers,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
      href: "/dashboard/admin/manage-services",
    },
    {
      label: "Total Bookings",
      value: stats?.totalBookings ?? 0,
      subtext: `${stats?.completedBookings ?? 0} successfully completed`,
      icon: Briefcase,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10 dark:bg-purple-500/20",
      href: "/dashboard/admin/manage-services",
    },
    {
      label: "Platform Revenue",
      value: `৳ ${(stats?.totalRevenue ?? 0).toLocaleString()}`,
      subtext: "Completed bookings value",
      icon: TrendingUp,
      color: "text-[#15803D] dark:text-[#22C55E]",
      bg: "bg-[#15803D]/10 dark:bg-[#22C55E]/20",
      href: "/dashboard/admin/manage-services",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-16">
      {/* 1. Header Greeting & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#15803D] dark:text-[#22C55E]">
            <ShieldCheck className="size-3.5" />
            Admin Command Center
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#1C1917] dark:text-[#F4F4F5] sm:text-3xl">
            System Overview & Analytics
          </h1>
          <p className="mt-0.5 text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
            Real-time platform metrics, verification queue, and user management.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadDashboardData}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1917]/75 transition hover:bg-black/5 disabled:opacity-50 dark:border-white/10 dark:bg-[#27272A] dark:text-[#A1A1AA] dark:hover:bg-white/5"
          >
            <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Widgets */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className="group relative flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#27272A]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1C1917]/70 dark:text-[#A1A1AA]">
                    {card.label}
                  </span>
                  <div
                    className={`flex size-8 items-center justify-center rounded-xl ${card.bg} ${card.color}`}
                  >
                    <Icon className="size-4" />
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-2xl font-extrabold tracking-tight text-[#1C1917] dark:text-[#F4F4F5]">
                    {card.value}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#1C1917]/55 dark:text-[#A1A1AA]/70">
                    <span className="truncate">{card.subtext}</span>
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* 3. Main Split Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Pending Approvals & Recent Users */}
        <div className="space-y-8 lg:col-span-8">
          {/* Pending Services Approval Queue */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
            <div className="mb-5 flex items-center justify-between border-b border-black/5 pb-3 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                  <Clock className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    Services Awaiting Approval
                  </h2>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Newly submitted listings requiring admin review
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/admin/manage-services"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803D] hover:underline dark:text-[#22C55E]"
              >
                Review All ({stats?.pendingServices ?? 0})
                <ArrowRight className="size-3" />
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse rounded-xl bg-black/5 dark:bg-white/5"
                  />
                ))}
              </div>
            ) : pendingServices.length === 0 ? (
              <div className="rounded-xl border border-dashed border-black/10 py-8 text-center dark:border-white/10">
                <CheckCircle2 className="mx-auto size-7 text-[#15803D] dark:text-[#22C55E]" />
                <p className="mt-2 text-xs font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                  Queue is clear!
                </p>
                <p className="mt-0.5 text-[11px] text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                  All provider service submissions have been reviewed.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingServices.map((service) => (
                  <div
                    key={service._id}
                    className="flex flex-col gap-2 rounded-xl border border-black/5 bg-[#FAF9F7] p-3.5 transition hover:border-[#15803D]/20 sm:flex-row sm:items-center sm:justify-between dark:border-white/5 dark:bg-[#18181B]"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                        {service.title}
                      </h4>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-[#1C1917]/50 dark:text-[#A1A1AA]">
                        <span>{service.category || "Uncategorized"}</span>
                        <span>•</span>
                        <span className="font-semibold text-[#15803D] dark:text-[#22C55E]">
                          ৳{service.price}
                        </span>
                      </div>
                    </div>

                    <Link
                      href="/dashboard/admin/manage-services"
                      className="inline-flex items-center gap-1 rounded-lg bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-500/20 dark:bg-amber-500/20 dark:text-amber-300"
                    >
                      Action <ArrowRight className="size-3" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Newly Joined Users */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
            <div className="mb-5 flex items-center justify-between border-b border-black/5 pb-3 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <UserCheck className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    Recent User Signups
                  </h2>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Latest platform accounts created
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/admin/manage-users"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803D] hover:underline dark:text-[#22C55E]"
              >
                View all ({stats?.totalUsers ?? 0})
                <ArrowRight className="size-3" />
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-12 animate-pulse rounded-xl bg-black/5 dark:bg-white/5"
                  />
                ))}
              </div>
            ) : recentUsers.length === 0 ? (
              <p className="py-6 text-center text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]">
                No users found.
              </p>
            ) : (
              <div className="space-y-2">
                {recentUsers.map((u) => (
                  <div
                    key={u._id}
                    className="flex items-center justify-between rounded-xl bg-[#FAF9F7] px-3.5 py-2.5 text-xs dark:bg-[#18181B]"
                  >
                    <div>
                      <p className="font-semibold text-[#1C1917] dark:text-[#F4F4F5]">{u.name}</p>
                      <p className="text-[10px] text-[#1C1917]/50 dark:text-[#A1A1AA]">{u.email}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        u.role === "admin"
                          ? "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
                          : u.role === "provider"
                          ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
                          : "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Management & Distribution */}
        <div className="space-y-6 lg:col-span-4">
          {/* Quick Actions Shortcuts */}
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]/70 dark:text-[#A1A1AA]">
              Management Shortcuts
            </h3>
            <div className="mt-3 space-y-2">
              <Link
                href="/dashboard/admin/manage-services"
                className="flex items-center justify-between rounded-xl border border-black/5 bg-[#FAF9F7] p-3 transition hover:border-[#15803D]/30 hover:bg-[#15803D]/5 dark:border-white/5 dark:bg-[#18181B] dark:hover:bg-[#22C55E]/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/15 dark:text-[#22C55E]">
                    <Layers className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                      Manage Services
                    </p>
                    <p className="text-[10px] text-[#1C1917]/50 dark:text-[#A1A1AA]">
                      Approve, edit, or remove listings
                    </p>
                  </div>
                </div>
                <ArrowRight className="size-3.5 text-[#1C1917]/40 dark:text-[#A1A1AA]" />
              </Link>

              <Link
                href="/dashboard/admin/manage-users"
                className="flex items-center justify-between rounded-xl border border-black/5 bg-[#FAF9F7] p-3 transition hover:border-[#15803D]/30 hover:bg-[#15803D]/5 dark:border-white/5 dark:bg-[#18181B] dark:hover:bg-[#22C55E]/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                    <Users className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                      Manage Users
                    </p>
                    <p className="text-[10px] text-[#1C1917]/50 dark:text-[#A1A1AA]">
                      View & change roles
                    </p>
                  </div>
                </div>
                <ArrowRight className="size-3.5 text-[#1C1917]/40 dark:text-[#A1A1AA]" />
              </Link>
            </div>
          </div>

          {/* System Breakdown Card */}
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]/70 dark:text-[#A1A1AA]">
              Platform Composition
            </h3>
            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between border-b border-black/5 pb-2 dark:border-white/5">
                <span className="text-[#1C1917]/60 dark:text-[#A1A1AA]">Customers</span>
                <span className="font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                  {stats?.totalCustomers ?? 0}
                </span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2 dark:border-white/5">
                <span className="text-[#1C1917]/60 dark:text-[#A1A1AA]">Service Providers</span>
                <span className="font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                  {stats?.totalProviders ?? 0}
                </span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2 dark:border-white/5">
                <span className="text-[#1C1917]/60 dark:text-[#A1A1AA]">Administrators</span>
                <span className="font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                  {stats?.totalAdmins ?? 0}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#1C1917]/60 dark:text-[#A1A1AA]">Active Bookings</span>
                <span className="font-semibold text-[#15803D] dark:text-[#22C55E]">
                  {stats?.activeBookings ?? 0} in progress
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}