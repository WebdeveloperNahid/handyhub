"use client";

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
        <section className="bg-[#291C0E] px-4 py-20 text-[#E1D4C2] transition-colors duration-500 dark:bg-[#1F1712] sm:px-6">
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
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#A78D78]">
                        How it works
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Getting help is simple
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-[#C5B8AA]/70 sm:text-base">
                        HandyHub makes it easy to find the right professional
                        and get your everyday tasks taken care of.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative mt-16">
                    {/* Connecting line - desktop */}
                    <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden h-px bg-[#A78D78]/20 lg:block" />

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
                                    {/* Step icon */}
                                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#A78D78]/20 bg-[#382820] shadow-lg dark:bg-[#291C0E]">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6E473B] text-[#E1D4C2]">
                                            <Icon size={22} />
                                        </div>

                                        {/* Number */}
                                        <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#291C0E] bg-[#A78D78] text-[10px] font-bold text-[#291C0E] dark:border-[#1F1712]">
                                            {step.number}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="mt-7 text-lg font-semibold">
                                        {step.title}
                                    </h3>

                                    <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#C5B8AA]/65">
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
                    <a
                        href="/all-services"
                        className="group inline-flex items-center gap-2 rounded-full border border-[#A78D78]/30 px-5 py-2.5 text-sm font-medium text-[#E1D4C2] transition-all duration-300 hover:border-[#A78D78] hover:bg-[#6E473B]"
                    >
                        Explore services
                        <FiArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
