"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiTrendingUp,
} from "react-icons/fi";

const benefits = [
  "Showcase your skills",
  "Connect with new customers",
  "Grow your service business",
];

export default function ProviderCTA() {
  return (
    <section className="bg-[#FAF9F7] px-4 py-20  text-[#1C1917] transition-colors duration-500 dark:bg-[#18181B] dark:text-[#F4F4F5] sm:px-6">
      <div className="mx-auto max-w-6xl ">
        <div className="relative overflow-hidden rounded-3xl bg-[#18181B] px-6 py-12 shadow-xl dark:bg-[#202023] sm:px-10 lg:px-14 lg:py-14">
          {/* Decorative shapes */}
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#22C55E]/10" />
          <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full border border-[#22C55E]/10" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#22C55E] text-[#18181B]">
                <FiBriefcase size={20} />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#FBBF24]">
                For service providers
              </p>

              <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-[#F4F4F5] sm:text-4xl lg:text-5xl">
                Turn your skills into new opportunities.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#A1A1AA]/80 sm:text-base">
                Join HandyHub and make it easier for customers to discover your
                services, build your reputation and grow your business.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FBBF24]/15">
                      <FiCheck size={13} className="text-[#FBBF24]" />
                    </span>

                    <span className="text-sm text-[#A1A1AA]/90">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/signup"
                className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-[#F4F4F5] px-5 py-3 text-sm font-semibold text-[#18181B] transition-all duration-300 hover:bg-[#FBBF24]"
              >
                Become a provider
                <FiArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex justify-center lg:justify-end"
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full max-w-[320px] rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                {/* Card header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#A1A1AA]/60">
                      Provider dashboard
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#F4F4F5]">
                      Your performance
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FBBF24]/15">
                    <FiTrendingUp size={17} className="text-[#FBBF24]" />
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-2xl font-bold text-[#F4F4F5]">24</p>
                    <p className="mt-1 text-xs text-[#A1A1AA]/60">
                      New requests
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-2xl font-bold text-[#F4F4F5]">4.9</p>
                    <p className="mt-1 text-xs text-[#A1A1AA]/60">
                      Customer rating
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4 rounded-xl bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#A1A1AA]/70">
                      Profile visibility
                    </span>

                    <span className="text-xs font-semibold text-[#FBBF24]">
                      82%
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "82%" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.5,
                      }}
                      className="h-full rounded-full bg-[#FBBF24]"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
