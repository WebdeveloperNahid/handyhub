"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiCpu, FiArrowRight, FiCheckCircle, FiTool, FiAlertCircle } from "react-icons/fi";

interface RecommendationResult {
  serviceId?: string;
  recommendedServiceTitle: string;
  category?: string;
  reason: string;
  estimatedPrice: string | number;
}

const EXAMPLE_PROMPTS = [
  { label: "ফ্যান নষ্ট / Fan broken", text: "my fan is broken and making noise" },
  { label: "প্লাম্বার দরকার / Need plumber", text: "I need a plumber to fix water pipe leakage" },
  { label: "এসি সার্ভিসিং / AC repair", text: "my AC is not cooling and needs repair" },
];

export default function AiRecommendation() {
  const [userProblem, setUserProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGetRecommendation = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || userProblem;

    if (!query.trim()) {
      toast.error("অনুগ্রহ করে আপনার সমস্যার বিবরণ দিন।");
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
      const endpoint = `${cleanBase}/api/v1/ai/recommend`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userProblem: query.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setRecommendation(data.data);
        toast.success("AI সুপারিশ সফলভাবে প্রস্তুত হয়েছে!");
      } else {
        const msg = data.message || "সুপারিশ পেতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
        setErrorMessage(msg);
        toast.error(msg);
      }
    } catch (error: any) {
      console.error("[AiRecommendation] Fetch error:", error);
      const msg = "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। দয়া করে নিশ্চিত করুন ব্যাকএন্ড চালু আছে।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (text: string) => {
    setUserProblem(text);
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 sm:p-8 bg-white dark:bg-[#18181B] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
          <FiCpu className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            AI Service Recommendation
          </h1>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            Smart Matching Powered by HandyHub Intelligence
          </p>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
        আপনার ঘরের যেকোনো সমস্যা (যেমন ফ্যান নষ্ট, পাইপ লিক, এসি সার্ভিসিং) নিচে লিখুন।
        আমাদের AI স্বয়ংক্রিয়ভাবে ডাটাবেজ থেকে আপনার জন্য সবচেয়ে কার্যকর সার্ভিসটি খুঁজে দেবে।
      </p>

      {/* Suggestion Chips */}
      <div className="mb-4">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
          উদাহরণসমূহ (Quick Examples):
        </span>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(prompt.text)}
              className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 border border-gray-200 dark:border-white/10 transition-all cursor-pointer"
            >
              💡 {prompt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={(e) => handleGetRecommendation(e)} className="space-y-4">
        <div className="relative">
          <textarea
            value={userProblem}
            onChange={(e) => setUserProblem(e.target.value)}
            placeholder="আপনার সমস্যাটি বিস্তারিত লিখুন... যেমন: 'আমার ফ্যান ঘুরছে না এবং শব্দ করছে' বা 'I need a plumber to fix kitchen pipe leakage'"
            rows={4}
            className="w-full p-4 border border-gray-300 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#18181B] outline-none transition-all resize-y text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !userProblem.trim()}
          className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-lg shadow-emerald-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
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
              <span>AI ডাটাবেজ বিশ্লেষণ করছে...</span>
            </>
          ) : (
            <>
              <FiTool className="h-5 w-5" />
              <span>Get AI Recommendation</span>
            </>
          )}
        </button>
      </form>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start gap-3 text-red-700 dark:text-red-400 text-sm">
          <FiAlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Recommendation Result Card */}
      {recommendation && (
        <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50/70 to-teal-50/40 dark:from-emerald-950/20 dark:to-teal-950/10 border border-emerald-200/80 dark:border-emerald-800/40 rounded-2xl space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200/60 dark:border-emerald-800/40 pb-4">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <FiCheckCircle className="h-4 w-4" /> সেরা সার্ভিস সুপারিশ
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {recommendation.recommendedServiceTitle}
              </h3>
              {recommendation.category && (
                <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-medium">
                  {recommendation.category}
                </span>
              )}
            </div>

            <div className="text-right bg-white dark:bg-white/5 px-4 py-2 rounded-xl border border-emerald-100 dark:border-white/5">
              <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">আনুমানিক খরচ</span>
              <span className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                ৳{recommendation.estimatedPrice}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1.5">
              কেন এই সার্ভিসটি আপনার জন্য প্রয়োজন:
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {recommendation.reason}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            {recommendation.serviceId ? (
              <Link
                href={`/all-services/${recommendation.serviceId}`}
                className="inline-flex items-center gap-2 py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow transition-colors"
              >
                <span>সার্ভিসটি দেখুন ও বুক করুন</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href="/all-services"
                className="inline-flex items-center gap-2 py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow transition-colors"
              >
                <span>সব সার্ভিস দেখুন</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                setUserProblem("");
                setRecommendation(null);
              }}
              className="py-2.5 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              নতুন সমস্যা খুঁজুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}