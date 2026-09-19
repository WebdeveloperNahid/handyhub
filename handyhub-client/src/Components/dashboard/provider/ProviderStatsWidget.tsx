"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  PlayCircle,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import type { ProviderStats } from "@/types/index";

interface ProviderStatsWidgetProps {
  stats: ProviderStats | null;
  isLoading?: boolean;
}

export function ProviderStatsWidget({ stats, isLoading = false }: ProviderStatsWidgetProps) {
  const cards = [
    {
      label: "Total Services",
      value: stats?.totalServices ?? 0,
      icon: Layers,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
      href: "/dashboard/provider/my-services",
      subtext: `${stats?.activeServices ?? 0} active in marketplace`,
    },
    {
      label: "Pending Requests",
      value: stats?.pendingBookings ?? 0,
      icon: AlertCircle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10 dark:bg-amber-500/20",
      href: "/dashboard/provider/incoming-requests",
      subtext: "Requires immediate attention",
    },
    {
      label: "Active Jobs",
      value: stats?.activeJobs ?? 0,
      icon: PlayCircle,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
      href: "/dashboard/provider/active-jobs",
      subtext: "In progress or accepted",
    },
    {
      label: "Completed Jobs",
      value: stats?.completedBookings ?? 0,
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      href: "/dashboard/provider/active-jobs",
      subtext: "Fulfilled service orders",
    },
    {
      label: "Estimated Revenue",
      value: `৳ ${(stats?.estimatedRevenue ?? 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "text-[#15803D] dark:text-[#22C55E]",
      bg: "bg-[#15803D]/10 dark:bg-[#22C55E]/20",
      href: "/dashboard/provider/active-jobs",
      subtext: "From completed bookings",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => {
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
              <div className={`flex size-8 items-center justify-center rounded-xl ${card.bg} ${card.color}`}>
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
  );
}

export default ProviderStatsWidget;
