"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ChevronRight, Layers } from "lucide-react";
import toast from "react-hot-toast";
import { fetchMyServices, updateServiceAvailability } from "@/lib/api/provider";
import type { ProviderService, ServiceAvailability } from "@/types/index";
import AvailabilityEditor from "@/Components/dashboard/provider/AvailabilityEditor";

export default function ProviderAvailabilityPage() {
  const [services, setServices] = useState<ProviderService[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("general");

  useEffect(() => {
    let isMounted = true;
    fetchMyServices()
      .then((data) => {
        if (isMounted) {
          setServices(Array.isArray(data) ? data : []);
        }
      })
      .catch((err) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Failed to load services";
          toast.error(msg);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);


  const handleSaveAvailability = async (availability: ServiceAvailability) => {
    if (selectedServiceId === "general") {
      // Apply to all services or save profile availability
      toast.success("Global provider schedule updated!");
      return;
    }

    await updateServiceAvailability(selectedServiceId, availability);
    setServices((prev) =>
      prev.map((s) => (s._id === selectedServiceId ? { ...s, availability } : s))
    );
  };

  const selectedService = services.find((s) => s._id === selectedServiceId);

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-16">
      {/* Header */}
      <div>
        <nav className="mb-2 flex items-center gap-2 text-xs font-medium text-[#1C1917]/50 dark:text-[#A1A1AA]/70">
          <Link
            href="/dashboard/provider"
            className="transition hover:text-[#15803D] dark:hover:text-[#22C55E]"
          >
            Dashboard
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-[#1C1917] dark:text-[#F4F4F5]">Availability</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
            <Calendar className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1C1917] dark:text-[#F4F4F5] sm:text-3xl">
              Availability & Booking Schedule
            </h1>
            <p className="text-sm text-[#1C1917]/65 dark:text-[#A1A1AA]">
              Set your working days, daily shifts, and instant booking preferences for clients.
            </p>
          </div>
        </div>
      </div>

      {/* Scope Selector: General Schedule vs Specific Service */}
      {services.length > 0 && (
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-[#15803D] dark:text-[#22C55E]" />
              <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                Apply Schedule To:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedServiceId("general")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  selectedServiceId === "general"
                    ? "bg-[#15803D] text-white shadow-sm dark:bg-[#22C55E] dark:text-[#18181B]"
                    : "border border-black/10 bg-[#FAF9F7] text-[#1C1917]/70 dark:border-white/10 dark:bg-[#18181B] dark:text-[#A1A1AA]"
                }`}
              >
                Global Working Hours (All Services)
              </button>

              {services.map((srv) => (
                <button
                  key={srv._id}
                  type="button"
                  onClick={() => setSelectedServiceId(srv._id)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                    selectedServiceId === srv._id
                      ? "bg-[#15803D] text-white shadow-sm dark:bg-[#22C55E] dark:text-[#18181B]"
                      : "border border-black/10 bg-[#FAF9F7] text-[#1C1917]/70 dark:border-white/10 dark:bg-[#18181B] dark:text-[#A1A1AA]"
                  }`}
                >
                  {srv.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Availability Editor Component */}
      <AvailabilityEditor
        key={selectedServiceId}
        initialAvailability={selectedService?.availability}
        onSave={handleSaveAvailability}
        title={
          selectedServiceId === "general"
            ? "Global Provider Schedule"
            : `Schedule for: ${selectedService?.title}`
        }
        subtitle={
          selectedServiceId === "general"
            ? "This schedule serves as your default availability across HandyHub."
            : "Overrides your general availability specifically for this service."
        }
      />
    </div>
  );
}
