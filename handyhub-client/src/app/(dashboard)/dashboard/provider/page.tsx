"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Calendar,
  Layers,
  ListCheck,
  Briefcase,
  ArrowRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  fetchMyServices,
  fetchProviderBookings,
  fetchProviderStats,
  updateBookingStatus,
} from "@/lib/api/provider";
import type {
  Booking,
  BookingStatus,
  ProviderService,
  ProviderStats,
} from "@/types/index";
import ProviderStatsWidget from "@/Components/dashboard/provider/ProviderStatsWidget";
import BookingRequestCard from "@/Components/dashboard/provider/BookingRequestCard";

export default function ProviderOverviewPage() {
  const { data: session } = authClient.useSession();
  const providerName = session?.user?.name || "Service Provider";

  const [stats, setStats] = useState<ProviderStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [activeJobs, setActiveJobs] = useState<Booking[]>([]);
  const [services, setServices] = useState<ProviderService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboardData = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const [statsData, bookingsData, servicesData] = await Promise.allSettled([
        fetchProviderStats(),
        fetchProviderBookings(),
        fetchMyServices(),
      ]);

      if (statsData.status === "fulfilled") {
        setStats(statsData.value);
      }
      if (bookingsData.status === "fulfilled") {
        const allBookings = Array.isArray(bookingsData.value) ? bookingsData.value : [];
        setRecentBookings(allBookings.filter((b) => b.status === "Pending").slice(0, 3));
        setActiveJobs(
          allBookings
            .filter((b) => b.status === "Accepted" || b.status === "In Progress")
            .slice(0, 3)
        );
      }
      if (servicesData.status === "fulfilled") {
        setServices(Array.isArray(servicesData.value) ? servicesData.value.slice(0, 3) : []);
      }
    } catch {
      toast.error("Could not load latest dashboard data");
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    Promise.allSettled([
      fetchProviderStats(),
      fetchProviderBookings(),
      fetchMyServices(),
    ]).then(([statsData, bookingsData, servicesData]) => {
      if (!isMounted) return;
      if (statsData.status === "fulfilled") {
        setStats(statsData.value);
      }
      if (bookingsData.status === "fulfilled") {
        const allBookings = Array.isArray(bookingsData.value) ? bookingsData.value : [];
        setRecentBookings(allBookings.filter((b) => b.status === "Pending").slice(0, 3));
        setActiveJobs(
          allBookings
            .filter((b) => b.status === "Accepted" || b.status === "In Progress")
            .slice(0, 3)
        );
      }
      if (servicesData.status === "fulfilled") {
        setServices(Array.isArray(servicesData.value) ? servicesData.value.slice(0, 3) : []);
      }
      setIsLoading(false);
    }).catch(() => {
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    await updateBookingStatus(bookingId, newStatus);
    await loadDashboardData();
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-16">
      {/* 1. Header Greeting & Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#15803D] dark:text-[#22C55E]">
            <Sparkles className="size-3.5" />
            Provider Hub
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#1C1917] dark:text-[#F4F4F5] sm:text-3xl">
            Welcome back, {providerName}
          </h1>
          <p className="mt-0.5 text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
            Track service requests, manage active client jobs, and monitor your earnings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => void loadDashboardData(true)}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1917]/75 transition hover:bg-black/5 disabled:opacity-50 dark:border-white/10 dark:bg-[#27272A] dark:text-[#A1A1AA] dark:hover:bg-white/5"
          >
            <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>

          <Link
            href="/dashboard/provider/add-service"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#15803D] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#166534] dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#16A34A]"
          >
            <Plus className="size-4" />
            Add New Service
          </Link>
        </div>
      </div>

      {/* 2. Provider Statistics Overview Cards */}
      <ProviderStatsWidget stats={stats} isLoading={isLoading} />

      {/* 3. Main Dashboard Sections */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Section: Pending Requests & Active Jobs */}
        <div className="space-y-8 lg:col-span-8">
          {/* Pending Requests Section */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
            <div className="mb-5 flex items-center justify-between border-b border-black/5 pb-3 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                  <ListCheck className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    Pending Incoming Requests
                  </h2>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Accept or reject customer booking requests
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/provider/incoming-requests"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803D] hover:underline dark:text-[#22C55E]"
              >
                View all ({stats?.pendingBookings ?? 0})
                <ArrowRight className="size-3" />
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-28 animate-pulse rounded-xl bg-black/5 dark:bg-white/5"
                  />
                ))}
              </div>
            ) : recentBookings.length === 0 ? (
              <div className="rounded-xl border border-dashed border-black/10 py-10 text-center dark:border-white/10">
                <ListCheck className="mx-auto size-7 text-[#1C1917]/30 dark:text-[#A1A1AA]/40" />
                <p className="mt-2 text-xs font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                  No pending service requests
                </p>
                <p className="mt-0.5 text-[11px] text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                  New client bookings will appear here in real-time.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <BookingRequestCard
                    key={booking._id}
                    booking={booking}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Active Jobs in Progress Section */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
            <div className="mb-5 flex items-center justify-between border-b border-black/5 pb-3 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                  <Briefcase className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    Ongoing & Active Jobs
                  </h2>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Update job progress from Accepted to Completed
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/provider/active-jobs"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803D] hover:underline dark:text-[#22C55E]"
              >
                View all ({stats?.activeJobs ?? 0})
                <ArrowRight className="size-3" />
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-28 animate-pulse rounded-xl bg-black/5 dark:bg-white/5"
                  />
                ))}
              </div>
            ) : activeJobs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-black/10 py-10 text-center dark:border-white/10">
                <Briefcase className="mx-auto size-7 text-[#1C1917]/30 dark:text-[#A1A1AA]/40" />
                <p className="mt-2 text-xs font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                  No active jobs currently in progress
                </p>
                <p className="mt-0.5 text-[11px] text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                  Accepted requests ready for execution will display here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeJobs.map((booking) => (
                  <BookingRequestCard
                    key={booking._id}
                    booking={booking}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Quick Links & Services Summary */}
        <div className="space-y-6 lg:col-span-4">
          {/* Quick Management Shortcuts */}
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]/70 dark:text-[#A1A1AA]">
              Quick Actions
            </h3>
            <div className="mt-3 space-y-2">
              <Link
                href="/dashboard/provider/add-service"
                className="flex items-center justify-between rounded-xl border border-black/5 bg-[#FAF9F7] p-3 transition hover:border-[#15803D]/30 hover:bg-[#15803D]/5 dark:border-white/5 dark:bg-[#18181B] dark:hover:bg-[#22C55E]/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/15 dark:text-[#22C55E]">
                    <Plus className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                      Create New Service
                    </p>
                    <p className="text-[10px] text-[#1C1917]/50 dark:text-[#A1A1AA]">
                      Publish a trade listing
                    </p>
                  </div>
                </div>
                <ArrowRight className="size-3.5 text-[#1C1917]/40 dark:text-[#A1A1AA]" />
              </Link>

              <Link
                href="/dashboard/provider/availability"
                className="flex items-center justify-between rounded-xl border border-black/5 bg-[#FAF9F7] p-3 transition hover:border-[#15803D]/30 hover:bg-[#15803D]/5 dark:border-white/5 dark:bg-[#18181B] dark:hover:bg-[#22C55E]/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                    <Calendar className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                      Working Schedule
                    </p>
                    <p className="text-[10px] text-[#1C1917]/50 dark:text-[#A1A1AA]">
                      Set days & working hours
                    </p>
                  </div>
                </div>
                <ArrowRight className="size-3.5 text-[#1C1917]/40 dark:text-[#A1A1AA]" />
              </Link>

              <Link
                href="/dashboard/provider/my-services"
                className="flex items-center justify-between rounded-xl border border-black/5 bg-[#FAF9F7] p-3 transition hover:border-[#15803D]/30 hover:bg-[#15803D]/5 dark:border-white/5 dark:bg-[#18181B] dark:hover:bg-[#22C55E]/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                    <Layers className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                      My Services
                    </p>
                    <p className="text-[10px] text-[#1C1917]/50 dark:text-[#A1A1AA]">
                      Edit pricing & listings
                    </p>
                  </div>
                </div>
                <ArrowRight className="size-3.5 text-[#1C1917]/40 dark:text-[#A1A1AA]" />
              </Link>
            </div>
          </div>

          {/* Active Services Quick Snippet */}
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
            <div className="flex items-center justify-between border-b border-black/5 pb-3 dark:border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]/70 dark:text-[#A1A1AA]">
                My Services ({stats?.totalServices ?? 0})
              </h3>
              <Link
                href="/dashboard/provider/my-services"
                className="text-xs font-semibold text-[#15803D] hover:underline dark:text-[#22C55E]"
              >
                Manage
              </Link>
            </div>

            <div className="mt-3 space-y-2">
              {services.length === 0 ? (
                <p className="py-4 text-center text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]">
                  No services added yet.
                </p>
              ) : (
                services.map((s) => (
                  <div
                    key={s._id}
                    className="flex items-center justify-between rounded-xl bg-[#FAF9F7] p-2.5 text-xs dark:bg-[#18181B]"
                  >
                    <div className="flex-1 truncate pr-2 font-medium text-[#1C1917] dark:text-[#F4F4F5]">
                      {s.title}
                    </div>
                    <span className="font-bold text-[#15803D] dark:text-[#22C55E]">
                      ৳{Number(s.price).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}