import React from "react";
import type { BookingStatus } from "@/types/index";

interface BookingStatusBadgeProps {
  status: BookingStatus | string;
  size?: "sm" | "md";
}

export function BookingStatusBadge({ status, size = "md" }: BookingStatusBadgeProps) {
  const normalized = status?.toLowerCase();

  let colorClasses = "bg-gray-500/10 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300 border-gray-500/20";
  let dotColor = "bg-gray-500";

  if (normalized === "pending") {
    colorClasses = "bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/30";
    dotColor = "bg-amber-500";
  } else if (normalized === "accepted") {
    colorClasses = "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/30";
    dotColor = "bg-blue-500";
  } else if (normalized === "in progress" || normalized === "in_progress") {
    colorClasses = "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 border-indigo-500/30";
    dotColor = "bg-indigo-500 animate-pulse";
  } else if (normalized === "completed") {
    colorClasses = "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/30";
    dotColor = "bg-emerald-500";
  } else if (normalized === "rejected" || normalized === "cancelled") {
    colorClasses = "bg-rose-500/10 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-500/30";
    dotColor = "bg-rose-500";
  }

  const paddingClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide capitalize transition-colors ${paddingClass} ${colorClasses}`}
    >
      <span className={`size-1.5 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
}

export default BookingStatusBadge;
