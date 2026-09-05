"use client";

import { motion } from "framer-motion";
import {
    FiCheck,
    FiClock,
    FiShield,
    FiStar,
    FiUsers,
} from "react-icons/fi";

const benefits = [
    {
        icon: FiShield,
        title: "Trusted professionals",
        description:
            "Connect with service providers who are reviewed and verified through the platform.",
    },
    {
        icon: FiStar,
        title: "Quality you can see",
        description:
            "Check ratings and reviews before choosing someone for your service.",
    },
    {
        icon: FiClock,
        title: "Convenient booking",
        description:
            "Find available professionals and arrange your service without unnecessary hassle.",
    },
];

export default function WhyHandyHub() {
    return (
        <section className="bg-[#E1D4C2] px-4 py-20 text-[#291C0E] transition-colors duration-500 dark:bg-[#1F1712] dark:text-[#E1D4C2] sm:px-6">
            <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#6E473B] dark:text-[#A78D78]">
                            Why HandyHub
                        </p>

                        <h2 className="max-w-lg text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            Built around trust, convenience and quality.
                        </h2>

                        <p className="mt-5 max-w-lg text-sm leading-7 text-[#6E473B]/70 dark:text-[#C5B8AA]/70 sm:text-base">
                            Finding someone to handle an important task
                            shouldn't feel complicated. HandyHub brings
                            customers and skilled professionals together in
                            one simple place.
                        </p>

                        {/* Benefits */}
                        <div className="mt-10 space-y-7">
                            {benefits.map((benefit, index) => {
                                const Icon = benefit.icon;

                                return (
                                    <motion.div
                                        key={benefit.title}
                                        initial={{
                                            opacity: 0,
                                            x: -20,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.3,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.1,
                                        }}
                                        className="flex gap-4"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#291C0E] text-[#E1D4C2] dark:bg-[#A78D78] dark:text-[#291C0E]">
                                            <Icon size={19} />
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold">
                                                {benefit.title}
                                            </h3>

                                            <p className="mt-1.5 max-w-md text-sm leading-6 text-[#6E473B]/65 dark:text-[#C5B8AA]/65">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative"
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-[#291C0E] p-7 shadow-2xl dark:bg-[#2B211C] sm:p-9">
                            {/* Decorative elements */}
                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[#A78D78]/10" />
                            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full border border-[#A78D78]/10" />

                            {/* Top */}
                            <div className="relative flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.16em] text-[#A78D78]">
                                        HandyHub community
                                    </p>

                                    <h3 className="mt-2 text-xl font-semibold text-[#E1D4C2]">
                                        A better way to get things done.
                                    </h3>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6E473B] text-[#E1D4C2]">
                                    <FiUsers size={18} />
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="relative mt-10 grid grid-cols-2 gap-3">
                                <div className="rounded-2xl border border-[#A78D78]/10 bg-white/5 p-5">
                                    <p className="text-3xl font-bold text-[#E1D4C2]">
                                        4.9
                                    </p>

                                    <div className="mt-2 flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FiStar
                                                key={star}
                                                size={12}
                                                className="fill-current text-[#A78D78]"
                                            />
                                        ))}
                                    </div>

                                    <p className="mt-2 text-xs text-[#C5B8AA]/60">
                                        Average rating
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[#A78D78]/10 bg-white/5 p-5">
                                    <p className="text-3xl font-bold text-[#E1D4C2]">
                                        120+
                                    </p>

                                    <p className="mt-2 text-xs text-[#C5B8AA]/60">
                                        Completed jobs
                                    </p>
                                </div>
                            </div>

                            {/* Trust card */}
                            <div className="relative mt-3 rounded-2xl border border-[#A78D78]/10 bg-white/5 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A78D78]/15">
                                        <FiCheck
                                            size={18}
                                            className="text-[#A78D78]"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-[#E1D4C2]">
                                            Verified service providers
                                        </p>

                                        <p className="mt-1 text-xs text-[#C5B8AA]/60">
                                            Quality professionals, all in one
                                            place.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
