"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  CheckCircle2,
  XCircle,
  PlayCircle,
  Wrench,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import type { Booking, BookingStatus } from "@/types/index";
import BookingStatusBadge from "./BookingStatusBadge";

// Fixed DatabaseBooking interface resolving price and _id conflicts
interface DatabaseBooking extends Omit<Booking, "status" | "_id" | "price"> {
  _id?: string;
  status?: BookingStatus | string;
  serviceName?: string;
  serviceTitle?: string;
  serviceImage?: string;
  image?: string;
  serviceCategory?: string;
  bookingDate?: string;
  date?: string;
  bookingTime?: string;
  time?: string;
  address?: string;
  customerAddress?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  notes?: string;
  price?: number | string;
  service?: {
    image?: string;
    title?: string;
    name?: string;
  };
}

interface BookingRequestCardProps {
  booking: DatabaseBooking;
  onStatusChange?: (
    bookingId: string,
    newStatus: BookingStatus
  ) => Promise<void>;
}

export function BookingRequestCard({
  booking,
  onStatusChange,
}: BookingRequestCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAction = async (newStatus: BookingStatus) => {
    if (!onStatusChange || !booking._id) return;

    try {
      setIsUpdating(true);
      await onStatusChange(booking._id, newStatus);
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to update booking";
      toast.error(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  const statusLower = booking.status?.toLowerCase().trim() || "";

  // Dynamic Data Extraction from DB schema fields
  const title =
    booking.serviceName ||
    booking.serviceTitle ||
    booking.service?.name ||
    booking.service?.title ||
    "Requested Service";

  const imageUrl =
    booking.serviceImage ||
    booking.image ||
    booking.service?.image;

  const dateValue = booking.bookingDate || booking.date;
  const timeValue = booking.bookingTime || booking.time;
  const addressValue = booking.address || booking.customerAddress;

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-[#27272A]">
      {/* Top Accent Line */}
      <div className="h-0.5 w-full bg-[#15803D] dark:bg-[#22C55E]" />

      <div className="flex flex-col sm:flex-row items-stretch gap-4 p-4 sm:p-5">
        {/* Left Side: Service Image Thumbnail */}
        <div className="relative h-32 sm:h-auto sm:w-44 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full min-h-[120px] items-center justify-center text-[#15803D] dark:text-[#22C55E]">
              <Wrench className="size-10 opacity-70" />
            </div>
          )}
        </div>

        {/* Right Side: Main Content & Dynamic Information Details */}
        <div className="flex flex-1 flex-col justify-between min-w-0">
          {/* Top Title & Status Row */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#15803D] dark:text-[#22C55E]">
                  Booking #{booking._id?.slice(-6) || "N/A"}
                </span>
                {booking.serviceCategory && (
                  <span className="rounded-md bg-black/5 px-2 py-0.5 text-[10px] font-medium text-black/60 dark:bg-white/10 dark:text-white/60">
                    {booking.serviceCategory}
                  </span>
                )}
              </div>
              <BookingStatusBadge status={(booking.status || "Pending") as BookingStatus} />
            </div>

            {/* Dynamic Title From DB */}
            <h3
              className="mt-1 line-clamp-1 text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]"
              title={title}
            >
              {title}
            </h3>
          </div>

          {/* Middle Info Details (Grid View with Dynamic DB Data) */}
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {booking.customerName && (
              <div className="flex items-center gap-1.5 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
                <User className="size-3.5 shrink-0 text-[#15803D] dark:text-[#22C55E]" />
                <span className="truncate">{booking.customerName}</span>
              </div>
            )}

            {booking.customerPhone && (
              <div className="flex items-center gap-1.5 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
                <Phone className="size-3.5 shrink-0 text-[#15803D] dark:text-[#22C55E]" />
                <span className="truncate">{booking.customerPhone}</span>
              </div>
            )}

            {dateValue && (
              <div className="flex items-center gap-1.5 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
                <Calendar className="size-3.5 shrink-0 text-[#15803D] dark:text-[#22C55E]" />
                <span className="truncate">{dateValue}</span>
              </div>
            )}

            {timeValue && (
              <div className="flex items-center gap-1.5 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
                <Clock className="size-3.5 shrink-0 text-[#15803D] dark:text-[#22C55E]" />
                <span className="truncate">{timeValue}</span>
              </div>
            )}

            {addressValue && (
              <div className="col-span-2 sm:col-span-4 flex items-center gap-1.5 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
                <MapPin className="size-3.5 shrink-0 text-[#15803D] dark:text-[#22C55E]" />
                <span className="truncate" title={addressValue}>
                  {addressValue}
                </span>
              </div>
            )}
          </div>

          {/* Customer Notes (Rendered only if available) */}
          {booking.notes && (
            <div className="mt-2.5 rounded-lg bg-black/5 p-2 px-3 text-xs text-[#1C1917]/75 dark:bg-white/5 dark:text-[#A1A1AA]">
              <span className="font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                Note:{" "}
              </span>
              <span className="line-clamp-1">{booking.notes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar: Dynamic Price & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/5 bg-black/[0.01] px-4 sm:px-5 py-3 dark:border-white/5 dark:bg-white/[0.01]">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
            Total Price
          </span>
          <p className="text-base font-extrabold text-[#15803D] dark:text-[#22C55E]">
            ৳{" "}
            {booking.price !== undefined && booking.price !== null
              ? Number(booking.price).toLocaleString()
              : "0"}
          </p>
        </div>

        {/* Dynamic Action Buttons based on Status */}
        <div className="flex flex-wrap items-center gap-2">
          {statusLower === "pending" && (
            <>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => handleAction("Rejected")}
                className="inline-flex items-center gap-1 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-500/20 disabled:opacity-50 dark:text-rose-400"
              >
                <XCircle className="size-3.5" />
                Decline
              </button>

              <button
                type="button"
                disabled={isUpdating}
                onClick={() => handleAction("Accepted")}
                className="inline-flex items-center gap-1 rounded-xl bg-[#15803D] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#166534] disabled:opacity-50 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#16A34A]"
              >
                {isUpdating ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="size-3.5" />
                )}
                Accept Request
              </button>
            </>
          )}

          {statusLower === "accepted" && (
            <>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => handleAction("Cancelled")}
                className="inline-flex items-center gap-1 rounded-xl border border-black/10 bg-black/5 px-3 py-1.5 text-xs font-semibold text-[#1C1917]/70 transition hover:bg-black/10 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-[#A1A1AA]"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isUpdating}
                onClick={() => handleAction("In Progress")}
                className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-500"
              >
                {isUpdating ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <PlayCircle className="size-3.5" />
                )}
                Start Job
              </button>
            </>
          )}

          {(statusLower === "in progress" ||
            statusLower === "in-progress" ||
            statusLower === "in_progress") && (
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => handleAction("Completed")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#15803D] px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#166534] disabled:opacity-50 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#16A34A]"
            >
              {isUpdating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <CheckCircle2 className="size-4" />
              )}
              Mark Completed
            </button>
          )}

          {statusLower === "completed" && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <CheckCircle2 className="size-3.5" />
              Job Completed
            </span>
          )}

          {(statusLower === "rejected" || statusLower === "cancelled") && (
            <span className="text-xs font-semibold capitalize text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
              {statusLower}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default BookingRequestCard;