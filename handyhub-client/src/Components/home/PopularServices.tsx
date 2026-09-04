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
        <section className="bg-[#E1D4C2] px-4 py-20 text-[#291C0E] transition-colors duration-500 dark:bg-[#1F1712] dark:text-[#E1D4C2]">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="mb-12 max-w-2xl"
                >
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#6E473B] dark:text-[#A78D78]">
                        Popular services
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Services for every task
                    </h2>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-[#6E473B]/70 dark:text-[#C5B8AA]/70 sm:text-base">
                        From quick repairs to everyday home care, find the
                        right professional for the job.
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
                                    className="group block h-full rounded-2xl border border-[#6E473B]/10 bg-white/45 p-6 transition-all duration-300 hover:border-[#6E473B]/20 hover:bg-white/70 hover:shadow-xl dark:border-[#A78D78]/10 dark:bg-[#291C0E]/50 dark:hover:border-[#A78D78]/20 dark:hover:bg-[#291C0E]/80"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#291C0E] text-[#E1D4C2] transition-transform duration-300 group-hover:scale-105 dark:bg-[#A78D78] dark:text-[#291C0E]">
                                            <Icon size={21} />
                                        </div>

                                        <FiArrowUpRight
                                            size={20}
                                            className="text-[#6E473B]/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#6E473B] dark:text-[#C5B8AA]/40 dark:group-hover:text-[#A78D78]"
                                        />
                                    </div>

                                    <h3 className="mt-7 text-lg font-semibold">
                                        {service.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-[#6E473B]/65 dark:text-[#C5B8AA]/65">
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
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#6E473B] transition-colors hover:text-[#291C0E] dark:text-[#A78D78] dark:hover:text-[#E1D4C2]"
                    >
                        Browse all services
                        <FiArrowUpRight size={17} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}