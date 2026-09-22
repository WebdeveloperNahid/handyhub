"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Sparkles,
  Wrench,
  Zap,
  Hammer,
  Tv,
  Paintbrush,
  CheckCircle2,
  Clock,
  Calendar,
  UploadCloud,
  Link2,
  Plus,
  ArrowRight,
  RotateCcw,
  Check,
  Info,
  AlertCircle,
  ChevronRight,
  FileText,
  DollarSign,
  ShieldAlert,
  ArrowLeft,
  Star,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { createService } from "@/lib/api/provider";
import { SERVICE_CATEGORIES } from "@/types/index";
import type { ServiceAvailability, ServiceCategory } from "@/types/index";

const PRESET_IMAGES = [
  {
    name: "Deep Cleaning",
    category: "Cleaning",
    url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Plumbing Repair",
    category: "Plumbing",
    url: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Electrical Wiring",
    category: "Electrical",
    url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Home Painting",
    category: "Painting",
    url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Appliance Repair",
    category: "Appliance Repair",
    url: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=80",
  },
];

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Plumbing: <Wrench className="size-4" />,
  Electrical: <Zap className="size-4" />,
  Cleaning: <Sparkles className="size-4" />,
  Painting: <Paintbrush className="size-4" />,
  "Home Repair": <Hammer className="size-4" />,
  "Appliance Repair": <Tv className="size-4" />,
};

interface FormState {
  title: string;
  category: ServiceCategory | string;
  price: string;
  pricingModel: "fixed" | "hourly" | "starting_at";
  duration: string;
  image: string;
  description: string;
  availabilityStatus: "available" | "busy" | "by-appointment";
  selectedDays: string[];
  workingHoursFrom: string;
  workingHoursTo: string;
  instantBooking: boolean;
  responseTime: string;
  highlights: string[];
}

const initialFormState: FormState = {
  title: "",
  category: SERVICE_CATEGORIES[0] || "Cleaning",
  price: "",
  pricingModel: "fixed",
  duration: "1 - 2 Hours",
  image:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
  description: "",
  availabilityStatus: "available",
  selectedDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  workingHoursFrom: "09:00 AM",
  workingHoursTo: "06:00 PM",
  instantBooking: true,
  responseTime: "Under 1 hour",
  highlights: [
    "100% Verified Professional Service",
    "All Essential Tools & Equipment Provided",
    "Post-service Quality Inspection Guarantee",
  ],
};

export default function AddServicePage() {
  const router = useRouter();
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const userRole = (session?.user as { role?: string })?.role;
  const providerName = session?.user?.name || "Professional Provider";

  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [imageTab, setImageTab] = useState<"preset" | "url">("preset");
  const [newHighlight, setNewHighlight] = useState("");

  const handleFieldChange = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (backendError) {
      setBackendError(null);
    }
  };

  const handlePriceChange = (value: string) => {
    // Only permit positive integer/decimal digits
    const cleaned = value.replace(/[^0-9.]/g, "");
    handleFieldChange("price", cleaned);
  };

  const toggleDay = (day: string) => {
    setForm((prev) => {
      const exists = prev.selectedDays.includes(day);
      const updated = exists
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day];
      return { ...prev, selectedDays: updated };
    });
    if (errors.selectedDays) {
      setErrors((prev) => ({ ...prev, selectedDays: undefined }));
    }
  };

  const setDaysPreset = (preset: "all" | "weekdays" | "weekends") => {
    if (preset === "all") {
      setForm((prev) => ({ ...prev, selectedDays: [...DAYS_OF_WEEK] }));
    } else if (preset === "weekdays") {
      setForm((prev) => ({
        ...prev,
        selectedDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        selectedDays: ["Saturday", "Sunday"],
      }));
    }
    if (errors.selectedDays) {
      setErrors((prev) => ({ ...prev, selectedDays: undefined }));
    }
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    if (form.highlights.includes(newHighlight.trim())) {
      toast.error("Highlight already added");
      return;
    }
    setForm((prev) => ({
      ...prev,
      highlights: [...prev.highlights, newHighlight.trim()],
    }));
    setNewHighlight("");
  };

  const handleRemoveHighlight = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const validateForm = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};

    if (!form.title.trim()) {
      errs.title = "Service title is required";
    } else if (form.title.trim().length < 3) {
      errs.title = "Title must be at least 3 characters";
    }

    if (!form.category) {
      errs.category = "Please select a category";
    }

    const priceNum = Number(form.price);
    if (!form.price.trim() || Number.isNaN(priceNum) || priceNum <= 0) {
      errs.price = "Enter a valid positive price greater than 0";
    }

    if (!form.description.trim()) {
      errs.description = "Service description is required";
    } else if (form.description.trim().length < 10) {
      errs.description = "Description should be at least 10 characters";
    }

    if (form.selectedDays.length === 0) {
      errs.selectedDays = "Select at least one available working day";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleReset = () => {
    setForm(initialFormState);
    setErrors({});
    setBackendError(null);
    toast("Form reset to defaults", { icon: "🧹" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBackendError(null);

    if (!validateForm()) {
      toast.error("Please complete all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const availabilityData: ServiceAvailability = {
        status: form.availabilityStatus,
        days: form.selectedDays.length > 0 ? form.selectedDays : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        workingHours: {
          from: form.workingHoursFrom || "09:00 AM",
          to: form.workingHoursTo || "06:00 PM",
        },
        instantBooking: form.instantBooking,
        responseTime: form.responseTime || "Under 1 hour",
      };

      const finalImage =
        form.image.trim().length > 0
          ? form.image.trim()
          : PRESET_IMAGES.find((p) => p.category === form.category)?.url ||
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80";

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        price: Number(form.price),
        image: finalImage,
        availability: availabilityData,
        duration: form.duration || "1 - 2 Hours",
        highlights: form.highlights,
        status: "pending" as const,
      };

      await createService(payload);

      toast.success("Service published successfully!");
      router.push("/dashboard/provider/my-services");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Unable to communicate with the server. Please check your network and try again.";
      setBackendError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Route Guard: Block non-providers gracefully
  if (!isAuthPending && userRole && userRole !== "provider") {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
          <ShieldAlert className="size-7" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-[#1C1917] dark:text-[#F4F4F5]">
          Provider Access Required
        </h2>
        <p className="mt-2 text-sm text-[#1C1917]/70 dark:text-[#A1A1AA]">
          This page is reserved for verified service providers on HandyHub. Please switch to a provider account or explore services as a customer.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#166534] dark:bg-[#22C55E] dark:text-[#18181B]"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mx-auto max-w-7xl space-y-8 pb-20"
    >
      {/* Page Header with Breadcrumbs */}
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
            <Link
              href="/dashboard/provider/my-services"
              className="transition hover:text-[#15803D] dark:hover:text-[#22C55E]"
            >
              My Services
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-[#1C1917] dark:text-[#F4F4F5]">Add Service</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
              <Plus className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#1C1917] dark:text-[#F4F4F5] sm:text-3xl">
                Add a New Service
              </h1>
              <p className="text-xs text-[#1C1917]/65 dark:text-[#A1A1AA] sm:text-sm">
                Publish a professional trade service listing to attract direct customer bookings.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/provider/my-services"
            className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1917]/75 transition hover:bg-black/5 dark:border-white/10 dark:bg-[#27272A] dark:text-[#A1A1AA] dark:hover:bg-white/5"
          >
            <ArrowLeft className="size-3.5" />
            Back to My Services
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1917]/75 transition hover:bg-black/5 dark:border-white/10 dark:bg-[#27272A] dark:text-[#A1A1AA] dark:hover:bg-white/5"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Backend Error Alert Banner */}
      {backendError && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/15 dark:text-rose-300">
          <AlertCircle className="size-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-rose-800 dark:text-rose-200">Unable to publish service</p>
            <p className="mt-0.5">{backendError}</p>
          </div>
        </div>
      )}

      {/* 2-Column Responsive Layout: Left Form (~60%), Right Preview (~40%) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 xl:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Basic Information */}
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A] sm:p-6">
              <div className="mb-5 flex items-center gap-2.5 border-b border-black/5 pb-4 dark:border-white/5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                  <FileText className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    1. Basic Information
                  </h2>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Enter the fundamental details that help customers discover your service.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                      Service Title <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-[#1C1917]/40 dark:text-[#A1A1AA]/50">
                      {form.title.length}/100
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={100}
                    value={form.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    placeholder="e.g., Deep Kitchen & Bathroom Sanitization Service"
                    className={`h-11 w-full rounded-xl border bg-[#FAF9F7] px-4 text-sm text-[#1C1917] outline-none transition-all placeholder:text-[#1C1917]/40 focus:border-[#15803D] focus:bg-white focus:ring-2 focus:ring-[#15803D]/20 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/50 dark:focus:border-[#22C55E] dark:focus:ring-[#22C55E]/20 ${errors.title
                        ? "border-red-500 bg-red-50/20"
                        : "border-black/10 dark:border-white/10"
                      }`}
                  />
                  {errors.title && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="size-3.5" />
                      {errors.title}
                    </p>
                  )}
                  <p className="mt-1 text-[11px] text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                    Use clear, descriptive wording mentioning what trade or problem is solved.
                  </p>
                </div>

                {/* Category Dropdown & Quick Select */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                    Service Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => handleFieldChange("category", e.target.value)}
                    className="h-11 w-full rounded-xl border border-black/10 bg-[#FAF9F7] px-3.5 text-sm font-medium text-[#1C1917] outline-none transition-all focus:border-[#15803D] focus:bg-white focus:ring-2 focus:ring-[#15803D]/20 dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E] dark:focus:ring-[#22C55E]/20"
                  >
                    {SERVICE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.category}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                      Detailed Description <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-[#1C1917]/40 dark:text-[#A1A1AA]/50">
                      {form.description.length} chars (min 10)
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    placeholder="Describe what is included in this service, how your team operates, any prerequisites, and guarantees you offer..."
                    className={`w-full resize-y rounded-xl border bg-[#FAF9F7] p-3.5 text-sm text-[#1C1917] outline-none transition-all placeholder:text-[#1C1917]/40 focus:border-[#15803D] focus:bg-white focus:ring-2 focus:ring-[#15803D]/20 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/50 dark:focus:border-[#22C55E] dark:focus:ring-[#22C55E]/20 ${errors.description
                        ? "border-red-500 bg-red-50/20"
                        : "border-black/10 dark:border-white/10"
                      }`}
                  />
                  {errors.description && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Pricing & Duration */}
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A] sm:p-6">
              <div className="mb-5 flex items-center gap-2.5 border-b border-black/5 pb-4 dark:border-white/5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                  <DollarSign className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    2. Pricing & Duration
                  </h2>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Set transparent pricing in BDT and estimated work duration.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Price */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                    Base Price (৳ BDT) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#1C1917]/40 dark:text-[#A1A1AA]/50">
                      ৳
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={form.price}
                      onChange={(e) => handlePriceChange(e.target.value)}
                      placeholder="1200"
                      className={`h-11 w-full rounded-xl border bg-[#FAF9F7] pl-8 pr-4 text-sm font-semibold text-[#1C1917] outline-none transition-all placeholder:font-normal placeholder:text-[#1C1917]/40 focus:border-[#15803D] focus:bg-white focus:ring-2 focus:ring-[#15803D]/20 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/50 dark:focus:border-[#22C55E] dark:focus:ring-[#22C55E]/20 ${errors.price
                          ? "border-red-500 bg-red-50/20"
                          : "border-black/10 dark:border-white/10"
                        }`}
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.price}</p>
                  )}
                </div>

                {/* Pricing Type */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                    Pricing Model
                  </label>
                  <select
                    value={form.pricingModel}
                    onChange={(e) =>
                      handleFieldChange(
                        "pricingModel",
                        e.target.value as "fixed" | "hourly" | "starting_at"
                      )
                    }
                    className="h-11 w-full rounded-xl border border-black/10 bg-[#FAF9F7] px-3.5 text-sm font-medium text-[#1C1917] outline-none transition-all focus:border-[#15803D] focus:bg-white dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
                  >
                    <option value="fixed">Fixed Price (Per Job)</option>
                    <option value="hourly">Hourly Rate</option>
                    <option value="starting_at">Starting From (Variable)</option>
                  </select>
                </div>

                {/* Duration */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                    Estimated Duration
                  </label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="text"
                      value={form.duration}
                      onChange={(e) => handleFieldChange("duration", e.target.value)}
                      placeholder="e.g., 1 - 2 Hours"
                      className="h-11 flex-1 rounded-xl border border-black/10 bg-[#FAF9F7] px-4 text-sm text-[#1C1917] outline-none transition focus:border-[#15803D] focus:bg-white dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
                    />
                    <div className="flex flex-wrap gap-1.5">
                      {["30 Mins", "1-2 Hours", "3-5 Hours", "Full Day"].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleFieldChange("duration", preset)}
                          className="rounded-lg border border-black/10 bg-black/5 px-2.5 py-2 text-xs font-medium text-[#1C1917]/70 transition hover:bg-[#15803D]/10 hover:text-[#15803D] dark:border-white/10 dark:bg-white/5 dark:text-[#A1A1AA] dark:hover:bg-[#22C55E]/10 dark:hover:text-[#22C55E]"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Media & Images */}
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A] sm:p-6">
              <div className="mb-5 flex items-center gap-2.5 border-b border-black/5 pb-4 dark:border-white/5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                  <UploadCloud className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    3. Media & Service Banner
                  </h2>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Provide a clean high-resolution banner image URL or select from curated presets.
                  </p>
                </div>
              </div>

              {/* Media Mode Tabs */}
              <div className="mb-4 flex items-center gap-1 rounded-xl bg-[#FAF9F7] p-1 dark:bg-[#18181B]">
                <button
                  type="button"
                  onClick={() => setImageTab("preset")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition ${imageTab === "preset"
                      ? "bg-white text-[#15803D] shadow-sm dark:bg-[#27272A] dark:text-[#22C55E]"
                      : "text-[#1C1917]/60 hover:text-[#1C1917] dark:text-[#A1A1AA]"
                    }`}
                >
                  <Sparkles className="size-3.5" />
                  Preset Library
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab("url")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition ${imageTab === "url"
                      ? "bg-white text-[#15803D] shadow-sm dark:bg-[#27272A] dark:text-[#22C55E]"
                      : "text-[#1C1917]/60 hover:text-[#1C1917] dark:text-[#A1A1AA]"
                    }`}
                >
                  <Link2 className="size-3.5" />
                  Custom Image URL
                </button>
              </div>

              {imageTab === "preset" ? (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleFieldChange("image", preset.url)}
                      className={`group relative aspect-video overflow-hidden rounded-xl border transition-all ${form.image === preset.url
                          ? "ring-2 ring-[#15803D] dark:ring-[#22C55E]"
                          : "border-black/10 opacity-75 hover:opacity-100 dark:border-white/10"
                        }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-center text-[10px] font-semibold text-white backdrop-blur-sm">
                        {preset.name}
                      </span>
                      {form.image === preset.url && (
                        <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-[#15803D] text-white dark:bg-[#22C55E] dark:text-[#18181B]">
                          <Check className="size-3" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => handleFieldChange("image", e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="h-11 w-full rounded-xl border border-black/10 bg-[#FAF9F7] px-4 text-sm text-[#1C1917] outline-none transition-all focus:border-[#15803D] focus:bg-white dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
                  />
                  <p className="mt-1 text-[11px] text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                    Paste a direct image link (PNG, JPG, WebP) from Unsplash or image host.
                  </p>
                </div>
              )}
            </div>

            {/* Section 4: Availability & Working Hours */}
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A] sm:p-6">
              <div className="mb-5 flex items-center justify-between border-b border-black/5 pb-4 dark:border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                    <Calendar className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                      4. Availability & Working Hours
                    </h2>
                    <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                      Configure when you are available to accept bookings for this service.
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#15803D]/10 px-2.5 py-1 text-[11px] font-bold text-[#15803D] dark:bg-[#22C55E]/15 dark:text-[#22C55E] capitalize">
                  ● {form.availabilityStatus.replace("-", " ")}
                </span>
              </div>

              <div className="space-y-5">
                {/* Available Days */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                      Available Working Days <span className="text-red-500">*</span>
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
                      const isSelected = form.selectedDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${isSelected
                              ? "bg-[#15803D] text-white shadow-sm dark:bg-[#22C55E] dark:text-[#18181B]"
                              : "border border-black/10 bg-[#FAF9F7] text-[#1C1917]/70 hover:border-black/20 dark:border-white/10 dark:bg-[#18181B] dark:text-[#A1A1AA]"
                            }`}
                        >
                          {day.slice(0, 3)}
                        </button>
                      );
                    })}
                  </div>
                  {errors.selectedDays && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.selectedDays}</p>
                  )}
                </div>

                {/* Shift Hours & Response Time */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                      Shift Starts (From)
                    </label>
                    <select
                      value={form.workingHoursFrom}
                      onChange={(e) => handleFieldChange("workingHoursFrom", e.target.value)}
                      className="h-11 w-full rounded-xl border border-black/10 bg-[#FAF9F7] px-3 text-xs font-medium text-[#1C1917] outline-none transition focus:border-[#15803D] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
                    >
                      {["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"].map(
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
                      value={form.workingHoursTo}
                      onChange={(e) => handleFieldChange("workingHoursTo", e.target.value)}
                      className="h-11 w-full rounded-xl border border-black/10 bg-[#FAF9F7] px-3 text-xs font-medium text-[#1C1917] outline-none transition focus:border-[#15803D] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
                    >
                      {["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"].map(
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
                      Response Time
                    </label>
                    <select
                      value={form.responseTime}
                      onChange={(e) => handleFieldChange("responseTime", e.target.value)}
                      className="h-11 w-full rounded-xl border border-black/10 bg-[#FAF9F7] px-3 text-xs font-medium text-[#1C1917] outline-none transition focus:border-[#15803D] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
                    >
                      <option value="Under 30 mins">Under 30 mins</option>
                      <option value="Under 1 hour">Under 1 hour</option>
                      <option value="Within 2-4 hours">Within 2-4 hours</option>
                      <option value="Same day">Same day</option>
                    </select>
                  </div>
                </div>

                {/* Instant Booking Switch */}
                <div className="flex items-center justify-between rounded-xl border border-black/10 bg-[#FAF9F7] p-3.5 dark:border-white/10 dark:bg-[#18181B]">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                      <Zap className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                        Allow Instant Bookings
                      </p>
                      <p className="text-[11px] text-[#1C1917]/60 dark:text-[#A1A1AA]">
                        Clients can confirm orders directly within your working shifts.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={form.instantBooking}
                      onChange={(e) => handleFieldChange("instantBooking", e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-black/20 after:absolute after:left-[2px] after:top-[2px] after:size-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#15803D] peer-checked:after:translate-x-full peer-focus:outline-none dark:bg-white/20 dark:peer-checked:bg-[#22C55E]" />
                  </label>
                </div>
              </div>
            </div>

            {/* Section 5: Included Features & Highlights */}
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A] sm:p-6">
              <div className="mb-4 flex items-center gap-2.5 border-b border-black/5 pb-4 dark:border-white/5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                  <CheckCircle2 className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    5. Service Highlights / What&apos;s Included
                  </h2>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Add bullet points highlighting safety, guarantees, and included tools.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddHighlight();
                    }
                  }}
                  placeholder="e.g., 30-Day Service Guarantee"
                  className="h-10 flex-1 rounded-xl border border-black/10 bg-[#FAF9F7] px-3.5 text-xs text-[#1C1917] outline-none transition focus:border-[#15803D] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
                />
                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="inline-flex items-center gap-1 rounded-xl bg-[#15803D]/10 px-3.5 py-2 text-xs font-semibold text-[#15803D] transition hover:bg-[#15803D] hover:text-white dark:bg-[#22C55E]/15 dark:text-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-[#18181B]"
                >
                  <Plus className="size-3.5" />
                  Add Highlight
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {form.highlights.map((hl, index) => (
                  <span
                    key={hl}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-[#FAF9F7] px-3 py-1.5 text-xs font-medium text-[#1C1917] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5]"
                  >
                    <CheckCircle2 className="size-3 text-[#15803D] dark:text-[#22C55E]" />
                    {hl}
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(index)}
                      className="ml-1 text-[#1C1917]/40 hover:text-red-500 dark:text-[#A1A1AA]/50"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="flex flex-col-reverse gap-3 rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A] sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl px-5 py-3 text-xs font-semibold text-[#1C1917]/70 transition hover:bg-black/5 dark:text-[#A1A1AA] dark:hover:bg-white/5"
              >
                Clear Form
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#15803D] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#15803D]/20 transition-all hover:bg-[#166534] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#16A34A] dark:shadow-[#22C55E]/10"
              >
                {isSubmitting ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-[#18181B]" />
                    Publishing Service...
                  </>
                ) : (
                  <>
                    <Check className="size-4" />
                    Publish Service
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Sticky Live Marketplace Preview Card (~40%) */}
        <div className="space-y-6 lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-md dark:border-white/10 dark:bg-[#27272A]">
              <div className="mb-4 flex items-center justify-between border-b border-black/5 pb-3 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-[#15803D] dark:text-[#22C55E]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]/75 dark:text-[#F4F4F5]">
                    Marketplace Preview
                  </span>
                </div>
                <span className="rounded-full bg-[#15803D]/10 px-2 py-0.5 text-[10px] font-bold text-[#15803D] dark:bg-[#22C55E]/15 dark:text-[#22C55E]">
                  Live
                </span>
              </div>

              {/* Service Card Mockup (exact parity with ServiceCard / ProviderServiceCard) */}
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#FAF9F7] transition-all duration-300 hover:border-[#15803D]/40 hover:shadow-xl dark:border-white/10 dark:bg-[#18181B] dark:hover:border-[#22C55E]/40">
                {/* Visual Header */}
                <div className="relative flex h-36 items-center justify-center bg-[#18181B] dark:bg-[#27272A] overflow-hidden">
                  {form.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={form.image}
                      alt="Service preview"
                      className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-[#15803D] text-white shadow-lg dark:bg-[#22C55E] dark:text-[#18181B]">
                      {CATEGORY_ICONS[form.category] || <Wrench className="size-6" />}
                    </div>
                  )}

                  {/* Category Pill */}
                  <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                    {form.category}
                  </span>

                  {/* Status Badge */}
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#15803D] shadow-sm backdrop-blur-md dark:bg-[#18181B]/90 dark:text-[#22C55E]">
                    <span className="size-1.5 animate-pulse rounded-full bg-[#15803D] dark:bg-[#22C55E]" />
                    {form.availabilityStatus === "available"
                      ? "Available"
                      : form.availabilityStatus === "by-appointment"
                        ? "Appointment"
                        : "Busy"}
                  </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center justify-between text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    <span className="font-medium truncate max-w-[140px]">
                      By {providerName}
                    </span>
                    <div className="flex items-center gap-1 text-[#F59E0B] dark:text-[#FBBF24]">
                      <Star size={13} className="fill-current" />
                      <span className="text-xs font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                        5.0 (New)
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-2 line-clamp-1 text-base font-semibold tracking-tight text-[#1C1917] dark:text-[#F4F4F5]">
                    {form.title.trim() || "Service Title Preview"}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#1C1917]/70 dark:text-[#A1A1AA]">
                    {form.description.trim() ||
                      "Add a descriptive summary of what is included in this service package..."}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 dark:border-white/10">
                    <div>
                      <p className="text-[10px] text-[#1C1917]/50 dark:text-[#A1A1AA]/70">
                        {form.pricingModel === "hourly"
                          ? "Hourly Rate"
                          : form.pricingModel === "starting_at"
                            ? "Starting at"
                            : "Fixed Price"}
                      </p>
                      <p className="text-sm font-bold text-[#15803D] dark:text-[#22C55E]">
                        ৳{Number(form.price) > 0 ? Number(form.price).toLocaleString() : "0"}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
                      <Clock className="size-3 text-[#15803D] dark:text-[#22C55E]" />
                      {form.duration || "1 - 2 Hours"}
                    </div>
                  </div>

                  <div className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#15803D] py-2.5 text-xs font-bold text-white transition dark:bg-[#22C55E] dark:text-[#18181B]">
                    View Details & Book
                  </div>
                </div>
              </article>
            </div>

            {/* Provider Tips Box */}
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
              <div className="flex items-center gap-2">
                <Info className="size-4 text-[#15803D] dark:text-[#22C55E]" />
                <h4 className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                  Listing Quality Guidelines
                </h4>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
                <li className="flex items-start gap-2">
                  <span className="text-[#15803D] dark:text-[#22C55E]">✓</span>
                  Specify clear service scope to avoid cancellation requests.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#15803D] dark:text-[#22C55E]">✓</span>
                  Accurate shift hours allow automated instant booking matching.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}