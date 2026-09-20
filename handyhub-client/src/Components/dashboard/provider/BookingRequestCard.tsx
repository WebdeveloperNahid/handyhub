"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  PlayCircle,
  FileText,
  DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";
import type { Booking, BookingStatus } from "@/types/index";
import BookingStatusBadge from "./BookingStatusBadge";

interface BookingRequestCardProps {
  booking: Booking;
  onStatusChange?: (bookingId: string, newStatus: BookingStatus) => Promise<void>;
}

export function BookingRequestCard({ booking, onStatusChange }: BookingRequestCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAction = async (newStatus: BookingStatus) => {
    if (!onStatusChange) return;
    try {
      setIsUpdating(true);
      await onStatusChange(booking._id, newStatus);
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update booking";
      toast.error(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  const statusLower = booking.status?.toLowerCase();

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-[#27272A]">
      {/* Top row: Service Title + Status */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#15803D] dark:text-[#22C55E]">
              Booking #{booking._id?.slice(-6)}
            </span>
            <h3 className="mt-0.5 text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
              {booking.serviceTitle || "Custom Service Booking"}
            </h3>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>

        {/* Customer & Schedule Details */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
            <User className="size-3.5 text-[#15803D] dark:text-[#22C55E]" />
            <span className="truncate">{booking.customerName || "Customer Client"}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
            <Phone className="size-3.5 text-[#15803D] dark:text-[#22C55E]" />
            <span>{booking.customerPhone || "Direct via HandyHub"}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
            <Calendar className="size-3.5 text-[#15803D] dark:text-[#22C55E]" />
            <span>{booking.date || "Scheduled Schedule"}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
            <Clock className="size-3.5 text-[#15803D] dark:text-[#22C55E]" />
            <span>{booking.time || "Flexible Slot"}</span>
          </div>

          {booking.customerAddress && (
            <div className="flex items-center gap-2 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA] sm:col-span-2">
              <MapPin className="size-3.5 text-[#15803D] dark:text-[#22C55E]" />
              <span className="truncate">{booking.customerAddress}</span>
            </div>
          )}
        </div>

        {/* Customer Notes */}
        {booking.notes && (
          <div className="mt-3.5 rounded-xl bg-black/5 p-3 text-xs text-[#1C1917]/75 dark:bg-white/5 dark:text-[#A1A1AA]">
            <p className="font-semibold text-[#1C1917] dark:text-[#F4F4F5]">Customer Note:</p>
            <p className="mt-0.5 line-clamp-2">{booking.notes}</p>
          </div>
        )}
      </div>

      {/* Bottom Bar: Price & Action buttons */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-4 dark:border-white/5">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
            Total Price
          </span>
          <p className="text-base font-extrabold text-[#15803D] dark:text-[#22C55E]">
            ৳ {booking.price ? Number(booking.price).toLocaleString() : "Contact for Quote"}
          </p>
        </div>

        {/* Action Buttons based on status */}
        <div className="flex flex-wrap items-center gap-2">
          {statusLower === "pending" && (
            <>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => handleAction("Rejected")}
                className="inline-flex items-center gap-1 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-500/20 disabled:opacity-50 dark:text-rose-400"
              >
                <XCircle className="size-3.5" />
                Decline
              </button>

              <button
                type="button"
                disabled={isUpdating}
                onClick={() => handleAction("Accepted")}
                className="inline-flex items-center gap-1 rounded-xl bg-[#15803D] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#166534] disabled:opacity-50 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#16A34A]"
              >
                <CheckCircle2 className="size-3.5" />
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
                className="inline-flex items-center gap-1 rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-xs font-semibold text-[#1C1917]/70 transition hover:bg-black/10 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-[#A1A1AA]"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isUpdating}
                onClick={() => handleAction("In Progress")}
                className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-500"
              >
                <PlayCircle className="size-3.5" />
                Start Job
              </button>
            </>
          )}

          {statusLower === "in progress" && (
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => handleAction("Completed")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#15803D] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#166534] disabled:opacity-50 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#16A34A]"
            >
              <CheckCircle2 className="size-4" />
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
            <span className="text-xs font-semibold text-[#1C1917]/50 dark:text-[#A1A1AA]/60 capitalize">
              {statusLower}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingRequestCard;
