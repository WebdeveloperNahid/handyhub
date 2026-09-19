"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Zap,
  Save,
  RotateCcw,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";
import type { ServiceAvailability } from "@/types/index";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface AvailabilityEditorProps {
  initialAvailability?: ServiceAvailability;
  onSave?: (availability: ServiceAvailability) => Promise<void>;
  title?: string;
  subtitle?: string;
}

const defaultAvailability: ServiceAvailability = {
  status: "available",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  workingHours: {
    from: "09:00 AM",
    to: "06:00 PM",
  },
  instantBooking: true,
  responseTime: "Under 1 hour",
};

export function AvailabilityEditor({
  initialAvailability = defaultAvailability,
  onSave,
  title = "Weekly Availability & Working Hours",
  subtitle = "Configure your working schedule and booking rules for customers.",
}: AvailabilityEditorProps) {
  const [availability, setAvailability] = useState<ServiceAvailability>(initialAvailability);
  const [isSaving, setIsSaving] = useState(false);

  const toggleDay = (day: string) => {
    setAvailability((prev) => {
      const exists = prev.days.includes(day);
      const days = exists ? prev.days.filter((d) => d !== day) : [...prev.days, day];
      return { ...prev, days };
    });
  };

  const setDaysPreset = (preset: "all" | "weekdays" | "weekends") => {
    if (preset === "all") {
      setAvailability((prev) => ({ ...prev, days: [...DAYS_OF_WEEK] }));
    } else if (preset === "weekdays") {
      setAvailability((prev) => ({
        ...prev,
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      }));
    } else {
      setAvailability((prev) => ({
        ...prev,
        days: ["Saturday", "Sunday"],
      }));
    }
  };

  const handleSave = async () => {
    if (availability.days.length === 0) {
      toast.error("Please select at least one working day");
      return;
    }

    try {
      setIsSaving(true);
      if (onSave) {
        await onSave(availability);
      }
      toast.success("Availability schedule saved successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save schedule";
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-black/5 pb-4 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
            <Calendar className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1C1917] dark:text-[#F4F4F5]">{title}</h2>
            <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">{subtitle}</p>
          </div>
        </div>

        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#15803D] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#166534] disabled:opacity-60 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#16A34A]"
        >
          {isSaving ? (
            <span className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-[#18181B]" />
          ) : (
            <Save className="size-3.5" />
          )}
          Save Schedule
        </button>
      </div>

      <div className="space-y-6">
        {/* Availability Status */}
        <div>
          <label className="mb-2 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
            Availability Status
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                id: "available",
                label: "Available Now",
                desc: "Open for instant requests and bookings",
              },
              {
                id: "by-appointment",
                label: "By Appointment",
                desc: "Requires manual confirmation before accepting",
              },
              {
                id: "busy",
                label: "Temporarily Busy",
                desc: "Currently fully booked or on leave",
              },
            ].map((st) => {
              const isSelected = availability.status === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setAvailability((prev) => ({ ...prev, status: st.id }))}
                  className={`rounded-xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? "border-[#15803D] bg-[#15803D]/5 ring-1 ring-[#15803D] dark:border-[#22C55E] dark:bg-[#22C55E]/10 dark:ring-[#22C55E]"
                      : "border-black/10 bg-[#FAF9F7] dark:border-white/10 dark:bg-[#18181B]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                      {st.label}
                    </span>
                    {isSelected && <Check className="size-4 text-[#15803D] dark:text-[#22C55E]" />}
                  </div>
                  <p className="mt-1 text-[11px] text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    {st.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Working Days */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
              Select Working Days
            </label>
            <div className="flex gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => setDaysPreset("all")}
                className="rounded px-2 py-0.5 text-[#15803D] hover:bg-[#15803D]/10 dark:text-[#22C55E]"
              >
                All 7 Days
              </button>
              <span className="text-black/20 dark:text-white/20">•</span>
              <button
                type="button"
                onClick={() => setDaysPreset("weekdays")}
                className="rounded px-2 py-0.5 text-[#15803D] hover:bg-[#15803D]/10 dark:text-[#22C55E]"
              >
                Mon - Fri
              </button>
              <span className="text-black/20 dark:text-white/20">•</span>
              <button
                type="button"
                onClick={() => setDaysPreset("weekends")}
                className="rounded px-2 py-0.5 text-[#15803D] hover:bg-[#15803D]/10 dark:text-[#22C55E]"
              >
                Sat - Sun
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = availability.days.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-[#15803D] text-white shadow-sm dark:bg-[#22C55E] dark:text-[#18181B]"
                      : "border border-black/10 bg-[#FAF9F7] text-[#1C1917]/70 hover:border-black/20 dark:border-white/10 dark:bg-[#18181B] dark:text-[#A1A1AA]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Shift Working Hours */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
              Shift Starts (From)
            </label>
            <select
              value={availability.workingHours.from}
              onChange={(e) =>
                setAvailability((prev) => ({
                  ...prev,
                  workingHours: { ...prev.workingHours, from: e.target.value },
                }))
              }
              className="h-11 w-full rounded-xl border border-black/10 bg-[#FAF9F7] px-3 text-xs font-medium text-[#1C1917] outline-none transition focus:border-[#15803D] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
            >
              {["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"].map(
                (t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
              Shift Ends (To)
            </label>
            <select
              value={availability.workingHours.to}
              onChange={(e) =>
                setAvailability((prev) => ({
                  ...prev,
                  workingHours: { ...prev.workingHours, to: e.target.value },
                }))
              }
              className="h-11 w-full rounded-xl border border-black/10 bg-[#FAF9F7] px-3 text-xs font-medium text-[#1C1917] outline-none transition focus:border-[#15803D] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
            >
              {["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"].map(
                (t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
              Avg. Response Time
            </label>
            <select
              value={availability.responseTime || "Under 1 hour"}
              onChange={(e) => setAvailability((prev) => ({ ...prev, responseTime: e.target.value }))}
              className="h-11 w-full rounded-xl border border-black/10 bg-[#FAF9F7] px-3 text-xs font-medium text-[#1C1917] outline-none transition focus:border-[#15803D] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
            >
              <option value="Under 30 mins">Under 30 mins</option>
              <option value="Under 1 hour">Under 1 hour</option>
              <option value="Within 2-4 hours">Within 2-4 hours</option>
              <option value="Same day">Same day</option>
            </select>
          </div>
        </div>

        {/* Instant Booking Toggle */}
        <div className="flex items-center justify-between rounded-xl border border-black/10 bg-[#FAF9F7] p-4 dark:border-white/10 dark:bg-[#18181B]">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
              <Zap className="size-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                Enable Instant Booking
              </p>
              <p className="text-[11px] text-[#1C1917]/60 dark:text-[#A1A1AA]">
                Auto-accept requests that match your weekly availability schedule.
              </p>
            </div>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={availability.instantBooking}
              onChange={(e) =>
                setAvailability((prev) => ({ ...prev, instantBooking: e.target.checked }))
              }
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-black/20 after:absolute after:left-[2px] after:top-[2px] after:size-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#15803D] peer-checked:after:translate-x-full peer-focus:outline-none dark:bg-white/20 dark:peer-checked:bg-[#22C55E]" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default AvailabilityEditor;
