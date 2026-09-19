"use client";

import React, { useState, useRef, useId } from "react";
import Link from "next/link";
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
  Trash2,
  Eye,
  ArrowRight,
  Copy,
  RotateCcw,
  Check,
  ShieldCheck,
  Info,
  AlertCircle,
  ChevronRight,
  Layers,
  FileText,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { imgUpload } from "@/lib/imageUpload";
import { SERVICE_CATEGORIES } from "@/types/index";
import type { NewServicePayload, ServiceAvailability } from "@/types/index";

// Quick curated demo image presets for instant testing
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
    name: "AC Repair",
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
  category: string;
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
    "100% Verified Professional",
    "Essential Tools & Equipment Included",
    "Post-service Clean Up Guarantee",
  ],
};

export default function AddServicePage() {
  const { data: session } = authClient.useSession();
  const providerId = (session?.user as { id?: string })?.id || "provider_demo_8824";
  const providerName = session?.user?.name || "Professional Provider";

  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageTab, setImageTab] = useState<"preset" | "url" | "upload">("preset");
  const [newHighlight, setNewHighlight] = useState("");
  const [submittedPayload, setSubmittedPayload] = useState<NewServicePayload | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const generatedDraftId = useId().replace(/[:]/g, "").slice(0, 8);

  // Field change handler
  const handleFieldChange = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Toggle day selection
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

  // Quick day preset buttons
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

  // Add highlight bullet
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

  // Remove highlight bullet
  const handleRemoveHighlight = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Handle local file image upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Attempt imgUpload (ImgBB)
      const res = await imgUpload(file);
      if (res?.url) {
        handleFieldChange("image", res.url);
        toast.success("Image uploaded successfully!");
      } else {
        // Safe fallback for local development without ImgBB credentials
        const objectUrl = URL.createObjectURL(file);
        handleFieldChange("image", objectUrl);
        toast.success("Image loaded for preview!");
      }
    } catch {
      // Offline / fallback handling
      const objectUrl = URL.createObjectURL(file);
      handleFieldChange("image", objectUrl);
      toast.success("Image loaded for preview!");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};

    if (!form.title.trim()) {
      errs.title = "Service title is required";
    } else if (form.title.trim().length < 5) {
      errs.title = "Title must be at least 5 characters";
    }

    if (!form.category) {
      errs.category = "Please select a category";
    }

    const priceNum = Number(form.price);
    if (!form.price.trim() || Number.isNaN(priceNum) || priceNum <= 0) {
      errs.price = "Enter a valid price greater than 0";
    }

    if (!form.image.trim()) {
      errs.image = "Please provide an image for the service";
    }

    if (!form.description.trim()) {
      errs.description = "Service description is required";
    } else if (form.description.trim().length < 20) {
      errs.description = "Description should be at least 20 characters";
    }

    if (form.selectedDays.length === 0) {
      errs.selectedDays = "Select at least one available working day";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Reset form
  const handleReset = () => {
    setForm(initialFormState);
    setErrors({});
    toast("Form reset to default values", { icon: "🧹" });
  };

  // Submit Handler: formats payload according to schema and console logs
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields properly");
      return;
    }

    setIsSubmitting(true);

    const generatedId = `srv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const availabilityData: ServiceAvailability = {
      status: form.availabilityStatus,
      days: form.selectedDays,
      workingHours: {
        from: form.workingHoursFrom,
        to: form.workingHoursTo,
      },
      instantBooking: form.instantBooking,
      responseTime: form.responseTime,
    };

    const payload: NewServicePayload = {
      id: generatedId,
      providerId: providerId,
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      price: Number(form.price),
      image: form.image.trim(),
      availability: availabilityData,
      duration: form.duration,
      highlights: form.highlights,
      createdAt: new Date().toISOString(),
    };

    // Primary Requirement: console log the submitted data
    console.log(
      "%c🚀 [HandyHub] Add Service - Submitted Payload:",
      "background: #15803D; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
      payload
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedPayload(payload);
      toast.success("Service created! Data logged to browser console.");
    }, 400);
  };

  const handleCopyJson = () => {
    if (!submittedPayload) return;
    navigator.clipboard.writeText(JSON.stringify(submittedPayload, null, 2));
    setHasCopied(true);
    toast.success("Payload copied to clipboard!");
    setTimeout(() => setHasCopied(false), 2000);
  };

  // Calculate form completion percentage
  const completionPercentage = (() => {
    let completed = 0;
    const total = 6;
    if (form.title.trim().length >= 5) completed += 1;
    if (form.category) completed += 1;
    if (Number(form.price) > 0) completed += 1;
    if (form.image.trim()) completed += 1;
    if (form.selectedDays.length > 0) completed += 1;
    if (form.description.trim().length >= 20) completed += 1;
    return Math.round((completed / total) * 100);
  })();

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-16">
      {/* 1. Header & Breadcrumbs */}
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
              Provider
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
                Add New Service
              </h1>
              <p className="text-sm text-[#1C1917]/65 dark:text-[#A1A1AA]">
                Configure service pricing, availability, and details to start receiving bookings.
              </p>
            </div>
          </div>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs font-semibold text-[#1C1917]/75 transition hover:bg-black/5 dark:border-white/10 dark:bg-[#27272A] dark:text-[#A1A1AA] dark:hover:bg-white/5"
          >
            <RotateCcw className="size-3.5" />
            Reset Form
          </button>
          <Link
            href="/dashboard/provider/my-services"
            className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs font-semibold text-[#1C1917]/75 transition hover:bg-black/5 dark:border-white/10 dark:bg-[#27272A] dark:text-[#A1A1AA] dark:hover:bg-white/5"
          >
            <Layers className="size-3.5" />
            View My Services
          </Link>
        </div>
      </div>

      {/* Completion & Schema Context Banner */}
      <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#27272A]/70 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/15 dark:text-[#22C55E]">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                  Active Provider:
                </span>
                <span className="rounded-md bg-black/5 px-2 py-0.5 text-xs font-mono font-medium text-[#15803D] dark:bg-white/10 dark:text-[#22C55E]">
                  {providerId}
                </span>
                <span className="text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]">
                  ({providerName})
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]/80">
                Draft ID: <span className="font-mono">srv_draft_{generatedDraftId}</span> • All submissions are logged to the console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:w-64">
            <div className="flex-1">
              <div className="flex justify-between text-xs font-medium text-[#1C1917]/70 dark:text-[#A1A1AA]">
                <span>Form Progress</span>
                <span className="font-bold text-[#15803D] dark:text-[#22C55E]">
                  {completionPercentage}%
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#15803D] to-[#22C55E] transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 xl:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card 1: Basic Information */}
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A] sm:p-6">
              <div className="mb-5 flex items-center gap-2.5 border-b border-black/5 pb-4 dark:border-white/5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                  <FileText className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    1. Basic Service Information
                  </h2>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Provide an enticing title and appropriate category for search discoverability.
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
                    placeholder="e.g., Professional Home Deep Cleaning & Sanitization"
                    className={`h-12 w-full rounded-xl border bg-[#FAF9F7] px-4 text-sm text-[#1C1917] outline-none transition-all placeholder:text-[#1C1917]/40 focus:border-[#15803D] focus:bg-white focus:ring-2 focus:ring-[#15803D]/20 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/50 dark:focus:border-[#22C55E] dark:focus:ring-[#22C55E]/20 ${
                      errors.title
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
                </div>

                {/* Category Grid Selection */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                    Select Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {SERVICE_CATEGORIES.map((cat) => {
                      const isSelected = form.category === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleFieldChange("category", cat)}
                          className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                            isSelected
                              ? "border-[#15803D] bg-[#15803D]/5 text-[#15803D] shadow-sm dark:border-[#22C55E] dark:bg-[#22C55E]/10 dark:text-[#22C55E]"
                              : "border-black/10 bg-[#FAF9F7] text-[#1C1917]/70 hover:border-black/20 dark:border-white/10 dark:bg-[#18181B] dark:text-[#A1A1AA] dark:hover:border-white/20"
                          }`}
                        >
                          <span
                            className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${
                              isSelected
                                ? "bg-[#15803D] text-white dark:bg-[#22C55E] dark:text-[#18181B]"
                                : "bg-black/5 text-[#1C1917]/60 dark:bg-white/5 dark:text-[#A1A1AA]"
                            }`}
                          >
                            {CATEGORY_ICONS[cat] || <Sparkles className="size-3.5" />}
                          </span>
                          <span className="truncate text-xs font-medium">{cat}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.category && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.category}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Card 2: Pricing & Duration */}
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A] sm:p-6">
              <div className="mb-5 flex items-center gap-2.5 border-b border-black/5 pb-4 dark:border-white/5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                  <Clock className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    2. Pricing & Duration
                  </h2>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Set fair, transparent pricing and estimated completion time.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Price */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                    Service Price (৳ BDT) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#1C1917]/40 dark:text-[#A1A1AA]/50">
                      ৳
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={form.price}
                      onChange={(e) => handleFieldChange("price", e.target.value)}
                      placeholder="1200"
                      className={`h-12 w-full rounded-xl border bg-[#FAF9F7] pl-9 pr-4 text-sm font-semibold text-[#1C1917] outline-none transition-all placeholder:font-normal placeholder:text-[#1C1917]/40 focus:border-[#15803D] focus:bg-white focus:ring-2 focus:ring-[#15803D]/20 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/50 dark:focus:border-[#22C55E] dark:focus:ring-[#22C55E]/20 ${
                        errors.price
                          ? "border-red-500 bg-red-50/20"
                          : "border-black/10 dark:border-white/10"
                      }`}
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.price}</p>
                  )}
                </div>

                {/* Pricing Model */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                    Pricing Type
                  </label>
                  <select
                    value={form.pricingModel}
                    onChange={(e) =>
                      handleFieldChange(
                        "pricingModel",
                        e.target.value as "fixed" | "hourly" | "starting_at"
                      )
                    }
                    className="h-12 w-full rounded-xl border border-black/10 bg-[#FAF9F7] px-3.5 text-sm font-medium text-[#1C1917] outline-none transition-all focus:border-[#15803D] focus:bg-white focus:ring-2 focus:ring-[#15803D]/20 dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E] dark:focus:ring-[#22C55E]/20"
                  >
                    <option value="fixed">Fixed Price (Per Job)</option>
                    <option value="hourly">Hourly Rate</option>
                    <option value="starting_at">Starting From (Variable)</option>
                  </select>
                </div>

                {/* Estimated Duration */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                    Estimated Service Duration
                  </label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="text"
                      value={form.duration}
                      onChange={(e) => handleFieldChange("duration", e.target.value)}
                      placeholder="e.g., 1 - 2 Hours"
                      className="h-11 flex-1 rounded-xl border border-black/10 bg-[#FAF9F7] px-4 text-sm text-[#1C1917] outline-none transition-all focus:border-[#15803D] focus:bg-white dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
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

            {/* Card 3: Media & Images */}
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A] sm:p-6">
              <div className="mb-5 flex items-center gap-2.5 border-b border-black/5 pb-4 dark:border-white/5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                  <UploadCloud className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    3. Service Image <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    High quality visuals drastically boost customer confidence and click-through rates.
                  </p>
                </div>
              </div>

              {/* Image Input Options Switcher */}
              <div className="mb-4 flex items-center gap-1 rounded-xl bg-[#FAF9F7] p-1 dark:bg-[#18181B]">
                <button
                  type="button"
                  onClick={() => setImageTab("preset")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition ${
                    imageTab === "preset"
                      ? "bg-white text-[#15803D] shadow-sm dark:bg-[#27272A] dark:text-[#22C55E]"
                      : "text-[#1C1917]/60 hover:text-[#1C1917] dark:text-[#A1A1AA]"
                  }`}
                >
                  <Sparkles className="size-3.5" />
                  Preset Samples
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab("upload")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition ${
                    imageTab === "upload"
                      ? "bg-white text-[#15803D] shadow-sm dark:bg-[#27272A] dark:text-[#22C55E]"
                      : "text-[#1C1917]/60 hover:text-[#1C1917] dark:text-[#A1A1AA]"
                  }`}
                >
                  <UploadCloud className="size-3.5" />
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab("url")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition ${
                    imageTab === "url"
                      ? "bg-white text-[#15803D] shadow-sm dark:bg-[#27272A] dark:text-[#22C55E]"
                      : "text-[#1C1917]/60 hover:text-[#1C1917] dark:text-[#A1A1AA]"
                  }`}
                >
                  <Link2 className="size-3.5" />
                  Direct URL
                </button>
              </div>

              {/* Tab 1: Presets */}
              {imageTab === "preset" && (
                <div className="space-y-3">
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Click any sample image below to select it immediately:
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => handleFieldChange("image", preset.url)}
                        className={`group relative aspect-video overflow-hidden rounded-xl border transition-all ${
                          form.image === preset.url
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
                </div>
              )}

              {/* Tab 2: Upload File */}
              {imageTab === "upload" && (
                <div>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/15 bg-[#FAF9F7] p-6 text-center transition hover:border-[#15803D] hover:bg-[#15803D]/5 dark:border-white/15 dark:bg-[#18181B] dark:hover:border-[#22C55E]"
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-black/5 text-[#15803D] dark:bg-white/5 dark:text-[#22C55E]">
                      <UploadCloud className="size-6" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                      {isUploading ? "Uploading file..." : "Click or drag & drop to upload"}
                    </p>
                    <p className="mt-1 text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: URL */}
              {imageTab === "url" && (
                <div>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => handleFieldChange("image", e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="h-11 w-full rounded-xl border border-black/10 bg-[#FAF9F7] px-4 text-sm text-[#1C1917] outline-none transition-all focus:border-[#15803D] focus:bg-white dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
                  />
                </div>
              )}

              {/* Current Image Preview Strip */}
              {form.image && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-black/10 bg-[#FAF9F7] p-2.5 dark:border-white/10 dark:bg-[#18181B]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.image}
                    alt="Active preview"
                    className="size-14 rounded-lg object-cover ring-1 ring-black/10 dark:ring-white/10"
                  />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-xs font-medium text-[#1C1917] dark:text-[#F4F4F5]">
                      {form.image}
                    </p>
                    <p className="text-[11px] text-[#15803D] dark:text-[#22C55E]">
                      ✓ Image ready for service listing
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange("image", "")}
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
                    title="Remove image"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              )}

              {errors.image && (
                <p className="mt-1.5 text-xs text-red-500">{errors.image}</p>
              )}
            </div>

            {/* Card 4: Availability & Scheduling (Crucial Schema requirement) */}
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
                      Define when and how customers can book this service with you.
                    </p>
                  </div>
                </div>

                {/* Status Indicator */}
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${
                    form.availabilityStatus === "available"
                      ? "bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/15 dark:text-[#22C55E]"
                      : form.availabilityStatus === "by-appointment"
                      ? "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                      : "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
                  }`}
                >
                  ● {form.availabilityStatus.replace("-", " ")}
                </span>
              </div>

              <div className="space-y-5">
                {/* Availability Status Options */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                    Service Availability Status
                  </label>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {[
                      {
                        value: "available",
                        label: "Available Now",
                        desc: "Accepting immediate booking requests",
                      },
                      {
                        value: "by-appointment",
                        label: "By Appointment",
                        desc: "Requires advance scheduling approval",
                      },
                      {
                        value: "busy",
                        label: "Limited / Busy",
                        desc: "High volume, waitlist or delays",
                      },
                    ].map((st) => {
                      const isSelected = form.availabilityStatus === st.value;
                      return (
                        <button
                          key={st.value}
                          type="button"
                          onClick={() =>
                            handleFieldChange(
                              "availabilityStatus",
                              st.value as "available" | "busy" | "by-appointment"
                            )
                          }
                          className={`rounded-xl border p-3 text-left transition-all ${
                            isSelected
                              ? "border-[#15803D] bg-[#15803D]/5 ring-1 ring-[#15803D] dark:border-[#22C55E] dark:bg-[#22C55E]/10 dark:ring-[#22C55E]"
                              : "border-black/10 bg-[#FAF9F7] dark:border-white/10 dark:bg-[#18181B]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                              {st.label}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="size-4 text-[#15803D] dark:text-[#22C55E]" />
                            )}
                          </div>
                          <p className="mt-1 text-[11px] text-[#1C1917]/60 dark:text-[#A1A1AA]">
                            {st.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

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
                          className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                            isSelected
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

                {/* Working Hours Range & Response Time */}
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
                      Avg. Response Time
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
                        Instant Booking Enabled
                      </p>
                      <p className="text-[11px] text-[#1C1917]/60 dark:text-[#A1A1AA]">
                        Clients can book immediately within your specified schedule.
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

            {/* Card 5: Description & Included Highlights */}
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A] sm:p-6">
              <div className="mb-5 flex items-center gap-2.5 border-b border-black/5 pb-4 dark:border-white/5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                  <FileText className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    5. Description & Highlights <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Detail your service scope, quality standards, and what is included.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                      Service Description
                    </label>
                    <span className="text-[11px] text-[#1C1917]/40 dark:text-[#A1A1AA]/50">
                      {form.description.length} characters (min 20)
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    placeholder="Describe what is included in this service, how your team operates, any prerequisites, and guarantees you offer..."
                    className={`w-full resize-y rounded-xl border bg-[#FAF9F7] p-4 text-sm text-[#1C1917] outline-none transition-all placeholder:text-[#1C1917]/40 focus:border-[#15803D] focus:bg-white focus:ring-2 focus:ring-[#15803D]/20 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/50 dark:focus:border-[#22C55E] dark:focus:ring-[#22C55E]/20 ${
                      errors.description
                        ? "border-red-500 bg-red-50/20"
                        : "border-black/10 dark:border-white/10"
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.description}</p>
                  )}
                </div>

                {/* Key Features / What's Included */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/80 dark:text-[#A1A1AA]">
                    Key Highlights / What&apos;s Included
                  </label>
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

                  {/* Highlights Pill List */}
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
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col-reverse gap-3 rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A] sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl px-5 py-3 text-xs font-semibold text-[#1C1917]/70 transition hover:bg-black/5 dark:text-[#A1A1AA] dark:hover:bg-white/5"
              >
                Clear / Reset Form
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#15803D] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#15803D]/20 transition-all hover:bg-[#166534] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#16A34A] dark:shadow-[#22C55E]/10"
              >
                {isSubmitting ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-[#18181B]" />
                    Processing Service...
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

        {/* Right Column: Sticky Live Preview & Guidance */}
        <div className="space-y-6 lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* Live Service Card Preview */}
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-md dark:border-white/10 dark:bg-[#27272A]">
              <div className="mb-4 flex items-center justify-between border-b border-black/5 pb-3 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Eye className="size-4 text-[#15803D] dark:text-[#22C55E]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]/75 dark:text-[#F4F4F5]">
                    Customer Live Preview
                  </span>
                </div>
                <span className="rounded-full bg-[#15803D]/10 px-2 py-0.5 text-[10px] font-bold text-[#15803D] dark:bg-[#22C55E]/15 dark:text-[#22C55E]">
                  Real-time
                </span>
              </div>

              {/* Service Card Mockup */}
              <div className="group overflow-hidden rounded-2xl border border-black/10 bg-[#FAF9F7] transition duration-300 dark:border-white/10 dark:bg-[#18181B]">
                {/* Image & Badges */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/10 dark:bg-white/5">
                  {form.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={form.image}
                      alt="Service Card Preview"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#1C1917]/30 dark:text-[#A1A1AA]/30">
                      <Sparkles className="size-8" />
                    </div>
                  )}

                  {/* Category Pill */}
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                    {form.category}
                  </span>

                  {/* Availability Badge */}
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
                <div className="p-4">
                  {/* Provider Info & Rating */}
                  <div className="flex items-center justify-between text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    <span className="font-medium truncate max-w-[150px]">
                      By {providerName}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-amber-500">
                      ★ 5.0 (New)
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 line-clamp-2 text-sm font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    {form.title.trim() || "Your Service Title will appear here..."}
                  </h3>

                  {/* Description snippet */}
                  <p className="mt-1.5 line-clamp-2 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
                    {form.description.trim() ||
                      "Add a compelling description to showcase the quality of your work..."}
                  </p>

                  {/* Working Days & Duration */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-black/5 pt-3 text-[11px] text-[#1C1917]/65 dark:border-white/5 dark:text-[#A1A1AA]">
                    <span className="inline-flex items-center gap-1 rounded bg-black/5 px-2 py-0.5 dark:bg-white/5">
                      <Clock className="size-3 text-[#15803D] dark:text-[#22C55E]" />
                      {form.duration || "1-2h"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-black/5 px-2 py-0.5 dark:bg-white/5">
                      <Calendar className="size-3 text-[#15803D] dark:text-[#22C55E]" />
                      {form.selectedDays.length === 7
                        ? "Everyday"
                        : `${form.selectedDays.length} Days / wk`}
                    </span>
                  </div>

                  {/* Price & CTA Button */}
                  <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3 dark:border-white/5">
                    <div>
                      <span className="text-[10px] text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                        {form.pricingModel === "hourly"
                          ? "Per Hour"
                          : form.pricingModel === "starting_at"
                          ? "Starting From"
                          : "Fixed Price"}
                      </span>
                      <p className="text-base font-extrabold text-[#15803D] dark:text-[#22C55E]">
                        ৳ {Number(form.price) > 0 ? Number(form.price).toLocaleString() : "0"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#15803D] px-3.5 py-2 text-xs font-bold text-white dark:bg-[#22C55E] dark:text-[#18181B]">
                      Book Now
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Quick Tips */}
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
              <div className="flex items-center gap-2">
                <Info className="size-4 text-[#15803D] dark:text-[#22C55E]" />
                <h4 className="text-xs font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                  HandyHub Pro Provider Tips
                </h4>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
                <li className="flex items-start gap-2">
                  <span className="text-[#15803D] dark:text-[#22C55E]">✓</span>
                  Clear, specific titles attract 40% more service requests.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#15803D] dark:text-[#22C55E]">✓</span>
                  Specifying accurate working hours prevents unfulfilled bookings.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#15803D] dark:text-[#22C55E]">✓</span>
                  Adding bullet highlights builds instant buyer confidence.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Post-Submission Payload Modal / Inspector */}
      {submittedPayload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-[#18181B]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-black/10 bg-[#FAF9F7] px-6 py-4 dark:border-white/10 dark:bg-[#27272A]">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#15803D]/15 text-[#15803D] dark:bg-[#22C55E]/15 dark:text-[#22C55E]">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    Service Created & Logged to Console
                  </h3>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    Open Browser DevTools (F12 → Console) or inspect the JSON below.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSubmittedPayload(null)}
                className="rounded-lg p-1.5 text-[#1C1917]/50 hover:bg-black/5 dark:text-[#A1A1AA] dark:hover:bg-white/5"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: JSON Inspector */}
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1C1917]/70 dark:text-[#A1A1AA]">
                  Payload Schema: <span className="font-mono text-[#15803D] dark:text-[#22C55E]">NewServicePayload</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="inline-flex items-center gap-1 rounded-lg border border-black/10 bg-[#FAF9F7] px-2.5 py-1 text-xs font-semibold text-[#1C1917] transition hover:bg-black/5 dark:border-white/10 dark:bg-[#27272A] dark:text-[#F4F4F5] dark:hover:bg-white/5"
                >
                  {hasCopied ? (
                    <>
                      <Check className="size-3 text-[#15803D] dark:text-[#22C55E]" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      Copy JSON
                    </>
                  )}
                </button>
              </div>

              <pre className="max-h-80 overflow-y-auto rounded-xl border border-black/10 bg-[#151618] p-4 text-xs font-mono text-emerald-400 dark:border-white/10">
                {JSON.stringify(submittedPayload, null, 2)}
              </pre>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col-reverse gap-2 border-t border-black/10 bg-[#FAF9F7] px-6 py-4 dark:border-white/10 dark:bg-[#27272A] sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setSubmittedPayload(null);
                  handleReset();
                }}
                className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-xs font-semibold text-[#1C1917] transition hover:bg-black/5 dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:hover:bg-white/5"
              >
                Add Another Service
              </button>
              <Link
                href="/dashboard/provider/my-services"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#15803D] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#166534] dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#16A34A]"
              >
                Go to My Services
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}