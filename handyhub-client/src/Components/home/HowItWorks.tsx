"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    FiArrowRight,
    FiCheckCircle,
    FiSearch,
    FiUserCheck,
} from "react-icons/fi";

const steps = [
    {
        number: "01",
        title: "Find a service",
        description:
            "Browse available services and choose what you need help with.",
        icon: FiSearch,
    },
    {
        number: "02",
        title: "Choose a professional",
        description:
            "Compare trusted providers by ratings, experience and availability.",
        icon: FiUserCheck,
    },
    {
        number: "03",
        title: "Get it done",
        description:
            "Book your service, connect with your provider and get the job done.",
        icon: FiCheckCircle,
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-[#FAF9F6] px-4 py-20 text-zinc-900 transition-colors duration-500 dark:bg-[#131514] dark:text-zinc-100 sm:px-6">
            <div className="mx-auto max-w-6xl">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#15803D] dark:text-[#22C55E]">
                        How it works
                    </span>

                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
                        Getting help is simple
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                        HandyHub makes it easy to find the right professional
                        and get your everyday tasks taken care of.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative mt-16">
                    {/* Connecting line - desktop */}
                    <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden h-[2px] bg-[#15803D]/20 dark:bg-[#22C55E]/20 lg:block" />

                    <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{
                                        opacity: 0,
                                        y: 30,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.25,
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        delay: index * 0.12,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="relative text-center"
                                >
                                    {/* Step icon wrapper */}
                                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-zinc-200/80 bg-white shadow-lg transition-all duration-300 hover:scale-105 dark:border-zinc-800 dark:bg-[#1B1D1C] dark:shadow-black/60">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#15803D]/20 bg-[#15803D]/10 text-[#15803D] dark:border-[#22C55E]/20 dark:bg-[#22C55E]/15 dark:text-[#22C55E]">
                                            <Icon size={22} />
                                        </div>

                                        {/* Number Badge */}
                                        <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#FAF9F6] bg-[#15803D] text-[11px] font-bold text-white shadow-sm dark:border-[#131514] dark:bg-[#22C55E] dark:text-[#131514]">
                                            {step.number}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="mt-7 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                        {step.title}
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        {step.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="mt-14 flex justify-center"
                >
                    <Link
                        href="/all-services"
                        className="group inline-flex items-center gap-2 rounded-full border border-[#15803D]/30 bg-white px-6 py-3 text-sm font-semibold text-[#15803D] shadow-sm transition-all duration-300 hover:border-[#15803D] hover:bg-[#15803D] hover:text-white dark:border-[#22C55E]/30 dark:bg-[#1B1D1C] dark:text-[#22C55E] dark:hover:border-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-[#131514]"
                    >
                        Explore services
                        <FiArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}