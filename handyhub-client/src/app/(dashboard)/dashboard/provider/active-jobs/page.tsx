"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Briefcase,
  PlayCircle,
  CheckCircle2,
  RefreshCw,
  ChevronRight,
  Inbox,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchProviderBookings, updateBookingStatus } from "@/lib/api/provider";
import type { Booking, BookingStatus } from "@/types/index";
import BookingRequestCard from "@/Components/dashboard/provider/BookingRequestCard";

const JOB_TABS = ["All Active", "In Progress", "Accepted", "Completed"];

export default function ActiveJobsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("All Active");
  const [isLoading, setIsLoading] = useState(true);

  const loadJobs = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const data = await fetchProviderBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load jobs";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchProviderBookings()
      .then((data) => {
        if (isMounted) {
          setBookings(Array.isArray(data) ? data : []);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Failed to load jobs";
          toast.error(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    await updateBookingStatus(bookingId, newStatus);
    await loadJobs(false);
  };

  const isInProgress = (st?: string) =>
    st === "in progress" || st === "in_progress" || st === "in-progress";

  const filteredJobs = bookings.filter((b) => {
    const st = b.status?.toLowerCase();
    if (selectedTab === "All Active") {
      return st === "accepted" || isInProgress(st);
    }
    if (selectedTab === "In Progress") {
      return isInProgress(st);
    }
    if (selectedTab === "Accepted") {
      return st === "accepted";
    }
    if (selectedTab === "Completed") {
      return st === "completed";
    }
    return true;
  });

  const inProgressCount = bookings.filter((b) =>
    isInProgress(b.status?.toLowerCase())
  ).length;

  const acceptedCount = bookings.filter((b) => b.status?.toLowerCase() === "accepted").length;
  const completedCount = bookings.filter((b) => b.status?.toLowerCase() === "completed").length;

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-16">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <nav className="mb-2 flex items-center gap-2 text-xs font-medium text-[#1C1917]/50 dark:text-[#A1A1AA]/70">
            <Link
              href="/dashboard/provider"
              className="transition hover:text-[#15803D] dark:hover:text-[#22C55E]"
            >
              Dashboard
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-[#1C1917] dark:text-[#F4F4F5]">Active Jobs</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
              <Briefcase className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#1C1917] dark:text-[#F4F4F5] sm:text-3xl">
                Active & Ongoing Jobs
              </h1>
              <p className="text-sm text-[#1C1917]/65 dark:text-[#A1A1AA]">
                Track ongoing client services and transition jobs from Accepted to Completed.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => loadJobs(true)}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1917]/75 transition hover:bg-black/5 disabled:opacity-50 dark:border-white/10 dark:bg-[#27272A] dark:text-[#A1A1AA] dark:hover:bg-white/5"
        >
          <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Jobs
        </button>

      </div>

      {/* Summary metric banner */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3.5 rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
          <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
            <PlayCircle className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1C1917]/60 dark:text-[#A1A1AA]">
              Currently In Progress
            </p>
            <p className="text-xl font-extrabold text-[#1C1917] dark:text-[#F4F4F5]">
              {inProgressCount} Jobs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            <Clock className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1C1917]/60 dark:text-[#A1A1AA]">
              Accepted (Ready to Start)
            </p>
            <p className="text-xl font-extrabold text-[#1C1917] dark:text-[#F4F4F5]">
              {acceptedCount} Jobs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <CheckCircle2 className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1C1917]/60 dark:text-[#A1A1AA]">
              Fulfilled History
            </p>
            <p className="text-xl font-extrabold text-[#1C1917] dark:text-[#F4F4F5]">
              {completedCount} Completed
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-black/10 pb-4 dark:border-white/10">
        {JOB_TABS.map((tab) => {
          const isSelected = selectedTab === tab;
          let count = 0;
          if (tab === "All Active") count = inProgressCount + acceptedCount;
          else if (tab === "In Progress") count = inProgressCount;
          else if (tab === "Accepted") count = acceptedCount;
          else if (tab === "Completed") count = completedCount;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                isSelected
                  ? "bg-[#15803D] text-white shadow-sm dark:bg-[#22C55E] dark:text-[#18181B]"
                  : "border border-black/10 bg-white text-[#1C1917]/70 hover:border-black/20 dark:border-white/10 dark:bg-[#27272A] dark:text-[#A1A1AA]"
              }`}
            >
              <span>{tab}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  isSelected
                    ? "bg-white/20 text-white dark:bg-[#18181B]/20 dark:text-[#18181B]"
                    : "bg-black/5 text-[#1C1917]/60 dark:bg-white/10 dark:text-[#A1A1AA]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Jobs List */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
            />
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/15 bg-white py-16 text-center dark:border-white/15 dark:bg-[#27272A]/50">
          <Inbox className="mx-auto size-10 text-[#1C1917]/30 dark:text-[#A1A1AA]/40" />
          <h3 className="mt-3 text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
            No jobs found in &apos;{selectedTab}&apos;
          </h3>
          <p className="mt-1 text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
            When you accept customer booking requests, they will show up here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredJobs.map((booking) => (
            <BookingRequestCard
              key={booking._id}
              booking={booking}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}