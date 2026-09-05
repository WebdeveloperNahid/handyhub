"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiDroplet,
  FiHome,
  FiTool,
  FiWind,
  FiZap,
  FiEdit3,
} from "react-icons/fi";

const services = [
  {
    title: "Plumbing",
    description: "Leaks, pipes, fixtures and everyday plumbing work.",
    icon: FiDroplet,
  },
  {
    title: "Electrical",
    description: "Reliable help for wiring, lights and electrical issues.",
    icon: FiZap,
  },
  {
    title: "Cleaning",
    description: "Keep your home fresh with trusted cleaning services.",
    icon: FiWind,
  },
  {
    title: "Painting",
    description: "Give your space a fresh look with skilled painters.",
    icon: FiEdit3,
  },
  {
    title: "Home Repair",
    description: "Fix those small and big household problems.",
    icon: FiHome,
  },
  {
    title: "Appliance Repair",
    description: "Get help with your essential home appliances.",
    icon: FiTool,
  },
];

export default function PopularServices() {
  return (
    <section className="bg-[#FAF9F7] px-4 py-20 text-[#1C1917] transition-colors duration-500 dark:bg-[#18181B] dark:text-[#F4F4F5]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F59E0B] dark:text-[#FBBF24]">
            Popular services
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Services for every task
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#1C1917]/70 dark:text-[#A1A1AA]/80 sm:text-base">
            From quick repairs to everyday home care, find the right
            professional for the job.
          </p>
        </motion.div>

        {/* Services */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
              >
                <Link
                  href="/all-services"
                  className="group block h-full rounded-2xl border border-black/10 bg-white/45 p-6 transition-all duration-300 hover:border-black/20 hover:bg-white/70 hover:shadow-xl dark:border-white/10 dark:bg-[#27272A]/50 dark:hover:border-white/20 dark:hover:bg-[#27272A]/80"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#15803D] text-[#FAF9F7] transition-transform duration-300 group-hover:scale-105 dark:bg-[#22C55E] dark:text-[#18181B]">
                      <Icon size={21} />
                    </div>

                    <FiArrowUpRight
                      size={20}
                      className="text-[#1C1917]/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#15803D] dark:text-[#A1A1AA]/40 dark:group-hover:text-[#22C55E]"
                    />
                  </div>

                  <h3 className="mt-7 text-lg font-semibold">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#1C1917]/65 dark:text-[#A1A1AA]/65">
                    {service.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <Link
            href="/all-services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#F59E0B] transition-colors hover:text-[#1C1917] dark:text-[#FBBF24] dark:hover:text-[#F4F4F5]"
          >
            Browse all services
            <FiArrowUpRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
