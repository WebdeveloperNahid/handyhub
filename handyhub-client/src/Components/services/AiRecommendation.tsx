"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FiCpu,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
  FiZap,
  FiSearch,
} from "react-icons/fi";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface RecommendationResult {
  serviceId?: string;
  recommendedServiceTitle: string;
  category?: string;
  reason: string;
  estimatedPrice: string | number;
}

// ─── Example prompts ───────────────────────────────────────────────────────────

const EXAMPLE_PROMPTS = [
  { label: "Fan broken",        text: "my fan is broken and making noise" },
  { label: "Need plumber",      text: "I need a plumber to fix water pipe leakage" },
  { label: "AC repair",         text: "my AC is not cooling and needs repair" },
  { label: "Electrical issue",  text: "my lights are flickering and switches not working" },
  { label: "Home cleaning",     text: "I need deep cleaning service for my home" },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function AiRecommendation() {
  const [userProblem,    setUserProblem]    = useState("");
  const [loading,        setLoading]        = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [errorMessage,   setErrorMessage]   = useState<string | null>(null);

  // ── Core handler (logic untouched) ────────────────────────────────────────

  const handleGetRecommendation = async (
    e?: React.FormEvent,
    customQuery?: string
  ) => {
    if (e) e.preventDefault();
    const query = customQuery || userProblem;

    if (!query.trim()) {
      toast.error("Please describe your problem first.");
      return;
    }

    setLoading(true);
    setRecommendation(null);
    setErrorMessage(null);

    try {
      const rawBaseUrl =
        process.env.NEXT_PUBLIC_SERVER_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000";

      // Normalize base URL
      const cleanBase = rawBaseUrl.replace(/\/+$/, "").replace(/\/api\/v1$/, "");
      const endpoint  = `${cleanBase}/api/v1/ai/recommend`;

      const response = await fetch(endpoint, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ userProblem: query.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setRecommendation(data.data);
        toast.success("AI recommendation is ready!");
      } else {
        const msg = data.message || "Unable to get a recommendation. Please try again.";
        setErrorMessage(msg);
        toast.error(msg);
      }
    } catch (error: unknown) {
      console.error("[AiRecommendation] Fetch error:", error);
      const msg = "Unable to reach the server. Please make sure the backend is running.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (text: string) => {
    setUserProblem(text);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">

      {/* ── Page header ────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#15803D] dark:text-[#22C55E]">
          AI-Powered
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-[#1C1917] dark:text-[#F4F4F5] sm:text-4xl">
          Find the right service, instantly
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#1C1917]/70 dark:text-[#A1A1AA] sm:text-base">
          Describe your home problem in your own words. Our AI will analyse
          your issue and recommend the most relevant service from the HandyHub
          platform.
        </p>
      </div>

      {/* ── Input card ─────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#18181B] dark:shadow-[0_10px_35px_rgba(0,0,0,0.22)]">

        {/* Card header */}
        <div className="flex items-center gap-3 border-b border-black/10 px-6 py-4 dark:border-white/10">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#15803D] text-white shadow-sm dark:bg-[#22C55E] dark:text-[#18181B]">
            <FiCpu className="h-4 w-4" />
          </span>

          <div>
            <p className="text-sm font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
              HandyHub AI Assistant
            </p>
            <p className="text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]">
              Smart service matching from your database
            </p>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6 sm:p-8">

          {/* Quick example chips */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1C1917]/50 dark:text-[#A1A1AA]">
              Quick examples
            </p>

            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChipClick(prompt.text)}
                  className="rounded-full border border-black/10 bg-[#FAF9F7] px-3 py-1.5 text-xs font-medium text-[#1C1917]/70 transition-colors hover:border-[#15803D]/40 hover:bg-[#15803D]/5 hover:text-[#15803D] dark:border-white/10 dark:bg-white/5 dark:text-[#A1A1AA] dark:hover:border-[#22C55E]/30 dark:hover:bg-[#22C55E]/5 dark:hover:text-[#22C55E]"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e) => handleGetRecommendation(e)} className="space-y-4">
            <div>
              <label
                htmlFor="problem-input"
                className="mb-2 block text-sm font-medium text-[#1C1917] dark:text-[#F4F4F5]"
              >
                Describe your problem
              </label>

              <textarea
                id="problem-input"
                value={userProblem}
                onChange={(e) => setUserProblem(e.target.value)}
                placeholder="e.g. My fan is making a loud noise and not spinning properly, or I have a water pipe leaking under the sink..."
                rows={4}
                className="w-full resize-y rounded-xl border border-black/10 bg-[#FAF9F7] p-4 text-sm text-[#1C1917] placeholder-[#1C1917]/40 outline-none transition-all focus:border-[#15803D]/50 focus:bg-white focus:ring-2 focus:ring-[#15803D]/20 dark:border-white/10 dark:bg-white/5 dark:text-[#F4F4F5] dark:placeholder-white/25 dark:focus:border-[#22C55E]/40 dark:focus:bg-white/[0.07] dark:focus:ring-[#22C55E]/15"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !userProblem.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#15803D] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#15803D]/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#22C55E]/90"
            >
              {loading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Analysing your problem...</span>
                </>
              ) : (
                <>
                  <FiSearch className="h-4 w-4" />
                  <span>Get AI Recommendation</span>
                </>
              )}
            </button>
          </form>

          {/* Error state */}
          {errorMessage && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
              <FiAlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Result card ────────────────────────────────────────────────────── */}
      {recommendation && (
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#18181B] dark:shadow-[0_10px_35px_rgba(0,0,0,0.22)]">

          {/* Top green accent line */}
          <div className="absolute left-0 top-0 h-[3px] w-full bg-[#15803D] dark:bg-[#22C55E]" />

          <div className="p-6 sm:p-8">

            {/* Result header */}
            <div className="flex flex-wrap items-start justify-between gap-4">

              {/* Service title + category */}
              <div className="min-w-0 flex-1">
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#15803D] dark:text-[#22C55E]">
                  <FiCheckCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  Recommended Service
                </p>

                <h2 className="text-xl font-bold tracking-tight text-[#1C1917] dark:text-[#F4F4F5] sm:text-2xl">
                  {recommendation.recommendedServiceTitle}
                </h2>

                {recommendation.category && (
                  <span className="mt-2 inline-block rounded-full border border-[#15803D]/20 bg-[#15803D]/5 px-2.5 py-0.5 text-xs font-medium text-[#15803D] dark:border-[#22C55E]/20 dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                    {recommendation.category}
                  </span>
                )}
              </div>

              {/* Price block */}
              <div className="flex-shrink-0 rounded-xl border border-black/10 bg-[#FAF9F7] px-5 py-3 text-right dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-medium text-[#1C1917]/50 dark:text-[#A1A1AA]">
                  Estimated price
                </p>
                <p className="mt-0.5 text-2xl font-bold text-[#15803D] dark:text-[#22C55E]">
                  ৳{recommendation.estimatedPrice}
                </p>
              </div>
            </div>

            {/* Why this service */}
            <div className="mt-6 rounded-xl border border-black/5 bg-[#FAF9F7] p-4 dark:border-white/5 dark:bg-white/[0.03]">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917]/50 dark:text-[#A1A1AA]">
                Why this service?
              </p>
              <p className="text-sm leading-7 text-[#1C1917]/80 dark:text-[#A1A1AA]">
                {recommendation.reason}
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              {recommendation.serviceId ? (
                <Link
                  href={`/all-services/${recommendation.serviceId}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#15803D]/90 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#22C55E]/90"
                >
                  <span>View &amp; Book Service</span>
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href="/all-services"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#15803D]/90 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#22C55E]/90"
                >
                  <span>Browse All Services</span>
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              )}

              <button
                type="button"
                onClick={() => {
                  setUserProblem("");
                  setRecommendation(null);
                }}
                className="rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-[#1C1917]/70 transition-colors hover:bg-black/5 dark:border-white/10 dark:text-[#A1A1AA] dark:hover:bg-white/5"
              >
                Start over
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Info footer hint (only when no result yet) ──────────────────── */}
      {!recommendation && !loading && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-black/5 bg-[#FAF9F7] px-5 py-4 dark:border-white/5 dark:bg-white/[0.02]">
          <FiZap className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#15803D] dark:text-[#22C55E]" />
          <p className="text-xs leading-5 text-[#1C1917]/60 dark:text-[#A1A1AA]">
            The AI analyses your description and matches it against real services
            in the HandyHub database. Results are based on your platform&apos;s
            live service listings.
          </p>
        </div>
      )}
    </div>
  );
}