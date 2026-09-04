"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    FiArrowLeft,
    FiCalendar,
    FiCheckCircle,
    FiClock,
    FiDroplet,
    FiHome,
    FiMapPin,
    FiMessageCircle,
    FiShield,
    FiStar,
    FiTool,
    FiUser,
    FiWind,
    FiZap,
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
        <main className="min-h-screen bg-[#E1D4C2] text-[#291C0E] transition-colors duration-500 dark:bg-[#1F1712] dark:text-[#E1D4C2]">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">

                {/* Back */}
                <Link
                    href="/all-services"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#6E473B] transition-colors hover:text-[#291C0E] dark:text-[#A78D78] dark:hover:text-[#E1D4C2]"
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
                            className="relative flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-[#291C0E] sm:h-80 dark:bg-[#30221C]"
                        >
                            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#A78D78]/20" />
                            <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border border-[#A78D78]/15" />

                            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-[#6E473B] text-[#E1D4C2] shadow-2xl">
                                <FiDroplet size={42} strokeWidth={1.5} />
                            </div>

                            <span className="absolute right-5 top-5 rounded-full border border-[#A78D78]/20 bg-white/5 px-4 py-2 text-xs font-medium text-[#E1D4C2]">
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
                                <span className="rounded-full bg-[#6E473B]/10 px-3 py-1.5 text-xs font-semibold text-[#6E473B] dark:bg-[#A78D78]/10 dark:text-[#A78D78]">
                                    {service.category}
                                </span>

                                <div className="flex items-center gap-1.5 text-sm">
                                    <FiStar
                                        size={15}
                                        className="fill-current text-[#6E473B] dark:text-[#A78D78]"
                                    />
                                    <span className="font-semibold">
                                        {service.rating}
                                    </span>
                                    <span className="text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                                        ({service.reviews} reviews)
                                    </span>
                                </div>
                            </div>

                            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                {service.title}
                            </h1>

                            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#6E473B]/70 dark:text-[#C5B8AA]/70 sm:text-base">
                                {service.description}
                            </p>
                        </motion.div>

                        {/* Service Features */}
                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl border border-[#6E473B]/15 bg-[#E8DDCE] p-5 dark:border-white/10 dark:bg-[#241B17]">
                                <FiClock
                                    size={20}
                                    className="text-[#6E473B] dark:text-[#A78D78]"
                                />
                                <p className="mt-4 text-xs text-[#6E473B]/50 dark:text-[#C5B8AA]/50">
                                    Duration
                                </p>
                                <p className="mt-1 text-sm font-semibold">
                                    {service.duration}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#6E473B]/15 bg-[#E8DDCE] p-5 dark:border-white/10 dark:bg-[#241B17]">
                                <FiMapPin
                                    size={20}
                                    className="text-[#6E473B] dark:text-[#A78D78]"
                                />
                                <p className="mt-4 text-xs text-[#6E473B]/50 dark:text-[#C5B8AA]/50">
                                    Location
                                </p>
                                <p className="mt-1 text-sm font-semibold">
                                    Your area
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#6E473B]/15 bg-[#E8DDCE] p-5 dark:border-white/10 dark:bg-[#241B17]">
                                <FiShield
                                    size={20}
                                    className="text-[#6E473B] dark:text-[#A78D78]"
                                />
                                <p className="mt-4 text-xs text-[#6E473B]/50 dark:text-[#C5B8AA]/50">
                                    Service
                                </p>
                                <p className="mt-1 text-sm font-semibold">
                                    Trusted provider
                                </p>
                            </div>
                        </div>

                        {/* About Service */}
                        <div className="mt-10">
                            <h2 className="text-xl font-bold">
                                What&apos;s included
                            </h2>

                            <div className="mt-5 space-y-3">
                                {[
                                    "Professional service from an experienced provider",
                                    "Inspection and basic troubleshooting",
                                    "Quality-focused repair or maintenance",
                                    "Clear pricing before starting the work",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3"
                                    >
                                        <FiCheckCircle
                                            size={18}
                                            className="mt-0.5 shrink-0 text-[#6E473B] dark:text-[#A78D78]"
                                        />

                                        <p className="text-sm text-[#6E473B]/70 dark:text-[#C5B8AA]/70">
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
                            className="sticky top-24 rounded-3xl border border-[#6E473B]/15 bg-[#E8DDCE] p-6 shadow-lg dark:border-white/10 dark:bg-[#241B17]"
                        >
                            <p className="text-xs text-[#6E473B]/50 dark:text-[#C5B8AA]/50">
                                Starting price
                            </p>

                            <div className="mt-1 flex items-end gap-2">
                                <span className="text-3xl font-bold">
                                    ৳{service.price}
                                </span>
                                <span className="mb-1 text-xs text-[#6E473B]/50 dark:text-[#C5B8AA]/50">
                                    / service
                                </span>
                            </div>

                            {/* Provider */}
                            <div className="mt-6 border-t border-[#6E473B]/10 pt-6 dark:border-white/10">
                                <p className="text-xs text-[#6E473B]/50 dark:text-[#C5B8AA]/50">
                                    Service provider
                                </p>

                                <div className="mt-4 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6E473B] text-[#E1D4C2]">
                                        <FiUser size={21} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            {service.provider.name}
                                        </p>

                                        <p className="mt-1 text-xs text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                                            {service.provider.experience}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between text-xs">
                                    <span className="flex items-center gap-1">
                                        <FiStar
                                            size={13}
                                            className="fill-current text-[#6E473B] dark:text-[#A78D78]"
                                        />
                                        {service.provider.rating} rating
                                    </span>

                                    <span className="text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                                        {service.provider.jobs} jobs
                                    </span>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-6 space-y-3">
                                <Link
                                    href="/booking"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#291C0E] px-5 py-3.5 text-sm font-semibold text-[#E1D4C2] transition-all duration-300 hover:bg-[#6E473B] dark:bg-[#6E473B] dark:hover:bg-[#A78D78] dark:hover:text-[#291C0E]"
                                >
                                    <FiCalendar size={16} />
                                    Book this service
                                </Link>

                                <button
                                    type="button"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#6E473B]/15 px-5 py-3.5 text-sm font-semibold text-[#6E473B] transition-all hover:border-[#A78D78] hover:bg-[#6E473B]/5 dark:border-white/10 dark:text-[#BEB5A9] dark:hover:border-[#A78D78]"
                                >
                                    <FiMessageCircle size={16} />
                                    Contact provider
                                </button>
                            </div>

                            <p className="mt-5 text-center text-[11px] leading-5 text-[#6E473B]/50 dark:text-[#C5B8AA]/50">
                                Final pricing may depend on the service
                                requirements.
                            </p>
                        </motion.div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default ServiceDetail;