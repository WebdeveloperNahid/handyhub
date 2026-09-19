"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  ListCheck,
  RefreshCw,
  ChevronRight,
  Inbox,
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchProviderBookings, updateBookingStatus } from "@/lib/api/provider";
import type { Booking, BookingStatus } from "@/types/index";
import BookingRequestCard from "@/Components/dashboard/provider/BookingRequestCard";

const STATUS_TABS = ["All", "Pending", "Accepted", "Rejected", "Cancelled"];

export default function IncomingRequestsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("Pending");
  const [isLoading, setIsLoading] = useState(true);

  const loadBookings = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const data = await fetchProviderBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load requests";
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
          const msg = err instanceof Error ? err.message : "Failed to load requests";
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
    await loadBookings(false);
  };


  const filteredBookings = bookings.filter((b) => {
    if (selectedTab === "All") return true;
    return b.status?.toLowerCase() === selectedTab.toLowerCase();
  });

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
            <span className="text-[#1C1917] dark:text-[#F4F4F5]">Incoming Requests</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
              <ListCheck className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#1C1917] dark:text-[#F4F4F5] sm:text-3xl">
                Incoming Booking Requests
              </h1>
              <p className="text-sm text-[#1C1917]/65 dark:text-[#A1A1AA]">
                Review and accept customer booking requests or decline if unavailable.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => loadBookings(true)}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1917]/75 transition hover:bg-black/5 disabled:opacity-50 dark:border-white/10 dark:bg-[#27272A] dark:text-[#A1A1AA] dark:hover:bg-white/5"
        >
          <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Requests
        </button>

      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-black/10 pb-4 dark:border-white/10">
        {STATUS_TABS.map((tab) => {
          const isSelected = selectedTab === tab;
          const count =
            tab === "All"
              ? bookings.length
              : bookings.filter((b) => b.status?.toLowerCase() === tab.toLowerCase()).length;

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

      {/* Bookings List */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
            />
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/15 bg-white py-16 text-center dark:border-white/15 dark:bg-[#27272A]/50">
          <Inbox className="mx-auto size-10 text-[#1C1917]/30 dark:text-[#A1A1AA]/40" />
          <h3 className="mt-3 text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
            No requests in &apos;{selectedTab}&apos;
          </h3>
          <p className="mt-1 text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
            When customers submit service bookings matching this status, they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredBookings.map((booking) => (
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