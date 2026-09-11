"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiDroplet,
  FiMapPin,
  FiMessageCircle,
  FiShield,
  FiStar,
  FiUser,
  FiCalendar,
} from "react-icons/fi";

const ServiceDetail = () => {
  // Temporary mock data
  const service = {
    title: "Professional Plumbing",
    category: "Plumbing",
    description:
      "Reliable plumbing services for leaks, pipe repairs, fittings, installations and other common household plumbing needs.",
    price: 500,
    rating: 4.9,
    reviews: 124,
    duration: "1–2 hrs",
    location: "Available in your area",
    provider: {
      name: "Rahim Ahmed",
      experience: "5+ years experience",
      rating: 4.9,
      jobs: 320,
    },
  };

  return (
    <main className="min-h-screen bg-[#FAF9F7] text-[#1C1917] transition-colors duration-300 dark:bg-[#18181B] dark:text-[#F4F4F5]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Back */}
        <Link
          href="/all-services"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#15803D] transition-colors hover:text-[#15803D]/80 dark:text-[#22C55E] dark:hover:text-[#22C55E]/80"
        >
          <FiArrowLeft size={16} />
          Back to services
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Main Content */}
          <div>
            {/* Service Visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-[#18181B] sm:h-80 dark:bg-[#27272A]"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
              <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border border-white/10" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-[#15803D] text-white shadow-2xl dark:bg-[#22C55E] dark:text-[#18181B]">
                <FiDroplet size={42} strokeWidth={1.5} />
              </div>

              <span className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-[#F4F4F5]">
                {service.category}
              </span>
            </motion.div>

            {/* Service Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#15803D]/10 px-3 py-1.5 text-xs font-semibold text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                  {service.category}
                </span>

                <div className="flex items-center gap-1.5 text-sm">
                  <FiStar
                    size={15}
                    className="fill-current text-[#15803D] dark:text-[#22C55E]"
                  />
                  <span className="font-semibold">{service.rating}</span>
                  <span className="text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    ({service.reviews} reviews)
                  </span>
                </div>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {service.title}
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-[#1C1917]/70 dark:text-[#A1A1AA] sm:text-base">
                {service.description}
              </p>
            </motion.div>

            {/* Service Features */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#27272A]">
                <FiClock
                  size={20}
                  className="text-[#15803D] dark:text-[#22C55E]"
                />
                <p className="mt-4 text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                  Duration
                </p>
                <p className="mt-1 text-sm font-semibold">{service.duration}</p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#27272A]">
                <FiMapPin
                  size={20}
                  className="text-[#15803D] dark:text-[#22C55E]"
                />
                <p className="mt-4 text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                  Location
                </p>
                <p className="mt-1 text-sm font-semibold">Your area</p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#27272A]">
                <FiShield
                  size={20}
                  className="text-[#15803D] dark:text-[#22C55E]"
                />
                <p className="mt-4 text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                  Service
                </p>
                <p className="mt-1 text-sm font-semibold">Trusted provider</p>
              </div>
            </div>

            {/* About Service */}
            <div className="mt-10">
              <h2 className="text-xl font-bold">What&apos;s included</h2>

              <div className="mt-5 space-y-3">
                {[
                  "Professional service from an experienced provider",
                  "Inspection and basic troubleshooting",
                  "Quality-focused repair or maintenance",
                  "Clear pricing before starting the work",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <FiCheckCircle
                      size={18}
                      className="mt-0.5 shrink-0 text-[#15803D] dark:text-[#22C55E]"
                    />

                    <p className="text-sm text-[#1C1917]/70 dark:text-[#A1A1AA]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="sticky top-24 rounded-3xl border border-black/10 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#27272A]"
            >
              <p className="text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                Starting price
              </p>

              <div className="mt-1 flex items-end gap-2">
                <span className="text-3xl font-bold">৳{service.price}</span>
                <span className="mb-1 text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                  / service
                </span>
              </div>

              {/* Provider */}
              <div className="mt-6 border-t border-black/10 pt-6 dark:border-white/10">
                <p className="text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                  Service provider
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#15803D] text-white dark:bg-[#22C55E] dark:text-[#18181B]">
                    <FiUser size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {service.provider.name}
                    </p>

                    <p className="mt-1 text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                      {service.provider.experience}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <FiStar
                      size={13}
                      className="fill-current text-[#15803D] dark:text-[#22C55E]"
                    />
                    {service.provider.rating} rating
                  </span>

                  <span className="text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    {service.provider.jobs} jobs
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 space-y-3">
                <Link
                  href="/booking"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#15803D] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#15803D]/90 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#22C55E]/90"
                >
                  <FiCalendar size={16} />
                  Book this service
                </Link>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 px-5 py-3.5 text-sm font-semibold text-[#1C1917] transition-all hover:border-[#15803D] hover:bg-[#15803D]/5 dark:border-white/10 dark:text-[#F4F4F5] dark:hover:border-[#22C55E] dark:hover:bg-[#22C55E]/5"
                >
                  <FiMessageCircle size={16} />
                  Contact provider
                </button>
              </div>

              <p className="mt-5 text-center text-[11px] leading-5 text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                Final pricing may depend on the service requirements.
              </p>
            </motion.div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetail;
