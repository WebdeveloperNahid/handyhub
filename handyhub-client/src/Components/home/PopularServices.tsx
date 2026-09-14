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
        <section
            className="
                relative isolate overflow-hidden
                px-4 py-20
                transition-colors duration-500

                bg-[#FAFAF9]
                text-[#111827]

                dark:bg-[#151618]
                dark:text-[#F9FAFB]
            "
        >
            {/* ================= BACKGROUND GLOW ================= */}

            {/* Subtle Green Glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    top-10
                    -z-10
                    h-[400px]
                    w-[400px]
                    rounded-full
                    bg-[#15803D]/[0.025]
                    blur-[130px]

                    dark:bg-[#22C55E]/[0.035]
                "
            />

            {/* Very subtle Amber Glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    bottom-0
                    -z-10
                    h-[400px]
                    w-[400px]
                    rounded-full
                    bg-[#F59E0B]/[0.018]
                    blur-[130px]

                    dark:bg-[#F59E0B]/[0.03]
                "
            />

            <div className="relative mx-auto max-w-6xl">

                {/* ================= HEADER ================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="mb-12 max-w-2xl"
                >
                    {/* Section Label */}
                    <div className="mb-4 flex items-center gap-3">
                        <span
                            className="
                                h-1.5
                                w-8
                                rounded-full

                                bg-[#15803D]

                                dark:bg-[#22C55E]
                            "
                        />

                        <p
                            className="
                                !m-0
                                text-sm
                                font-semibold
                                uppercase
                                tracking-[0.2em]

                                !text-[#15803D]

                                dark:!text-[#22C55E]
                            "
                        >
                            Popular Services
                        </p>
                    </div>

                    {/* Main Heading */}
                    <h2
                        className="
                            !m-0

                            text-3xl
                            font-bold
                            tracking-tight

                            !text-[#111827]

                            sm:text-4xl
                            lg:text-5xl

                            dark:!text-[#F9FAFB]
                        "
                    >
                        Services for every task
                    </h2>

                    {/* Header Description */}
                    <p
                        className="
                            !m-0
                            mt-4
                            max-w-xl

                            text-sm
                            leading-7

                            !text-[#4B5563]

                            sm:text-base

                            dark:!text-[#A1A1AA]
                        "
                    >
                        From quick repairs to everyday home care, find the
                        right professional for the job.
                    </p>
                </motion.div>

                {/* ================= SERVICE GRID ================= */}

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <motion.div
                                key={service.title}
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
                                    amount: 0.2,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.08,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={{
                                    y: -6,
                                }}
                            >
                                <Link
                                    href="/all-services"
                                    className="
                                        group
                                        relative
                                        block
                                        h-full
                                        overflow-hidden
                                        rounded-2xl
                                        p-6

                                        /* ================= LIGHT ================= */

                                        border
                                        border-black/[0.08]

                                        !bg-white

                                        shadow-[0_8px_30px_rgba(0,0,0,0.04)]

                                        hover:border-[#15803D]/30

                                        hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]

                                        /* ================= DARK ================= */

                                        dark:border-white/[0.08]

                                        dark:!bg-[#1D1D1F]

                                        dark:hover:border-[#22C55E]/20

                                        dark:hover:!bg-[#202123]

                                        dark:shadow-[0_10px_35px_rgba(0,0,0,0.22)]

                                        /* ================= TRANSITION ================= */

                                        transition-all
                                        duration-300
                                    "
                                >
                                    {/* Top Green Hover Line */}
                                    <span
                                        className="
                                            absolute
                                            left-0
                                            top-0
                                            h-[2px]
                                            w-0

                                            bg-[#15803D]

                                            transition-all
                                            duration-500

                                            group-hover:w-full

                                            dark:bg-[#22C55E]
                                        "
                                    />

                                    {/* ================= CARD TOP ================= */}

                                    <div className="flex items-start justify-between">

                                        {/* Icon */}
                                        <div
                                            className="
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-xl

                                                /* Light */
                                                bg-[#15803D]/[0.08]

                                                !text-[#15803D]

                                                ring-1
                                                ring-[#15803D]/10

                                                /* Dark */
                                                dark:bg-[#22C55E]/[0.08]

                                                dark:!text-[#22C55E]

                                                dark:ring-[#22C55E]/10

                                                transition-all
                                                duration-300

                                                group-hover:scale-105

                                                group-hover:bg-[#15803D]

                                                group-hover:!text-white

                                                dark:group-hover:bg-[#22C55E]

                                                dark:group-hover:!text-[#151618]
                                            "
                                        >
                                            <Icon size={21} />
                                        </div>

                                        {/* Arrow */}
                                        <div
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                rounded-full

                                                /* Light */
                                                bg-black/[0.025]

                                                !text-[#4B5563]/50

                                                /* Dark */
                                                dark:bg-white/[0.04]

                                                dark:!text-[#A1A1AA]/50

                                                transition-all
                                                duration-300

                                                group-hover:-translate-y-1
                                                group-hover:translate-x-1

                                                group-hover:bg-[#15803D]

                                                group-hover:!text-white

                                                dark:group-hover:bg-[#22C55E]

                                                dark:group-hover:!text-[#151618]
                                            "
                                        >
                                            <FiArrowUpRight size={18} />
                                        </div>
                                    </div>

                                    {/* ================= CARD TITLE ================= */}

                                    <h3
                                        className="
                                            !m-0
                                            mt-7

                                            text-lg
                                            font-semibold

                                            !text-[#18181B]

                                            dark:!text-[#F4F4F5]
                                        "
                                    >
                                        {service.title}
                                    </h3>

                                    {/* ================= CARD DESCRIPTION ================= */}

                                    <p
                                        className="
                                            !m-0
                                            mt-2

                                            text-sm
                                            leading-6

                                            !text-[#4B5563]

                                            dark:!text-[#A1A1AA]
                                        "
                                    >
                                        {service.description}
                                    </p>

                                    {/* ================= DIVIDER ================= */}

                                    <div
                                        className="
                                            mt-6
                                            h-px
                                            w-full

                                            bg-black/[0.08]

                                            dark:bg-white/[0.08]
                                        "
                                    />

                                    {/* ================= CARD FOOTER ================= */}

                                    <div
                                        className="
                                            mt-4
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >
                                        <span
                                            className="
                                                text-xs
                                                font-semibold

                                                !text-[#15803D]

                                                dark:!text-[#22C55E]
                                            "
                                        >
                                            Find a professional
                                        </span>

                                        <span
                                            className="
                                                text-xs

                                                !text-[#4B5563]/50

                                                dark:!text-[#A1A1AA]/40
                                            "
                                        >
                                            →
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ================= BOTTOM CTA ================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 15,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.2,
                    }}
                    className="mt-12 flex justify-center"
                >
                    <Link
                        href="/all-services"
                        className="
                            group
                            inline-flex
                            items-center
                            gap-2

                            rounded-full

                            border
                            border-[#15803D]/25

                            px-5
                            py-2.5

                            text-sm
                            font-semibold

                            !text-[#15803D]

                            transition-all
                            duration-300

                            hover:border-[#15803D]
                            hover:bg-[#15803D]
                            hover:!text-white

                            dark:border-[#22C55E]/25
                            dark:!text-[#22C55E]

                            dark:hover:border-[#22C55E]
                            dark:hover:bg-[#22C55E]
                            dark:hover:!text-[#151618]
                        "
                    >
                        Browse all services

                        <FiArrowUpRight
                            size={17}
                            className="
                                transition-transform
                                duration-300

                                group-hover:translate-x-1
                                group-hover:-translate-y-0.5
                            "
                        />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}