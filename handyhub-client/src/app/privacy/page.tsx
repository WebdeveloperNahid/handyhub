"use client";

import { motion } from "framer-motion";

const privacySections = [
    {
        title: "Introduction",
        content:
            "HandyHub respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how information is collected, used, and protected when you use our platform.",
    },
    {
        title: "Information We Collect",
        content:
            "We may collect information such as your name, email address, profile information, booking information, and other details necessary to provide our services.",
    },
    {
        title: "How We Use Information",
        content:
            "Your information may be used to provide and improve our services, process bookings, communicate with you, and maintain the security of the platform.",
    },
    {
        title: "Data Security",
        content:
            "We take reasonable measures to protect your information from unauthorized access, alteration, disclosure, or destruction.",
    },
    {
        title: "Contact Us",
        content:
            "If you have any questions about this Privacy Policy, please contact the HandyHub team.",
    },
];

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white px-4 py-16 text-[#291C0E] transition-colors duration-300 dark:bg-[#1F1712] dark:text-[#E1D4C2] sm:px-6">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <span className="inline-block rounded-full bg-[#E1D4C2] px-4 py-2 text-sm font-medium text-[#6E473B] dark:bg-[#382820] dark:text-[#C5B8AA]">
                        HandyHub Privacy
                    </span>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                        Privacy Policy
                    </h1>

                    <p className="mt-3 text-sm text-[#6E473B] dark:text-[#A78D78]">
                        Last updated: September 2026
                    </p>

                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#6E473B] dark:text-[#C5B8AA]">
                        Your privacy matters to us. Learn how HandyHub collects, uses,
                        and protects your information while you use our platform.
                    </p>
                </motion.div>

                {/* Privacy Timeline */}
                <div className="relative mt-16">

                    {/* Center Line */}
                    <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#A78D78]/50 md:block" />

                    <div className="space-y-12 md:space-y-20">

                        {privacySections.map((section, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <div
                                    key={section.title}
                                    className="relative grid md:grid-cols-2"
                                >

                                    {/* Center Dot */}
                                    <div className="absolute left-1/2 top-8 z-10 hidden -translate-x-1/2 md:block">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.15,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="h-4 w-4 rounded-full border-4 border-white bg-[#6E473B] shadow-md dark:border-[#1F1712] dark:bg-[#A78D78]"
                                        />
                                    </div>

                                    {/* Connector */}
                                    <div
                                        className={`absolute top-10 hidden h-px w-10 bg-[#A78D78]/50 md:block ${isLeft
                                            ? "right-0"
                                            : "left-0"
                                            }`}
                                    />

                                    {/* Left */}
                                    <div
                                        className={`hidden md:block ${isLeft ? "pr-14" : ""
                                            }`}
                                    >
                                        {isLeft && (
                                            <PrivacyCard
                                                title={section.title}
                                                content={section.content}
                                                index={index}
                                                direction="left"
                                            />
                                        )}
                                    </div>

                                    {/* Right */}
                                    <div
                                        className={`hidden md:block ${!isLeft ? "pl-14" : ""
                                            }`}
                                    >
                                        {!isLeft && (
                                            <PrivacyCard
                                                title={section.title}
                                                content={section.content}
                                                index={index}
                                                direction="right"
                                            />
                                        )}
                                    </div>

                                    {/* Mobile */}
                                    <div className="md:hidden">
                                        <PrivacyCard
                                            title={section.title}
                                            content={section.content}
                                            index={index}
                                            direction="mobile"
                                        />
                                    </div>

                                </div>
                            );
                        })}

                    </div>
                </div>

                {/* Bottom Privacy Note */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 rounded-2xl bg-[#291C0E] p-7 text-center shadow-lg dark:bg-[#382820]"
                >
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#A78D78] text-lg font-bold text-[#291C0E]">
                        ✓
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-[#E1D4C2]">
                        Your Privacy Matters
                    </h3>

                    <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#BEB5A9]">
                        We are committed to handling your information responsibly and
                        keeping your experience on HandyHub safe and secure.
                    </p>
                </motion.div>

            </div>
        </main>
    );
}


/* Privacy Card */
function PrivacyCard({
    title,
    content,
    index,
    direction,
}: {
    title: string;
    content: string;
    index: number;
    direction: "left" | "right" | "mobile";
}) {
    const animation =
        direction === "left"
            ? { x: -35, opacity: 0 }
            : direction === "right"
                ? { x: 35, opacity: 0 }
                : { y: 20, opacity: 0 };

    return (
        <motion.section
            initial={animation}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group rounded-2xl border border-[#BEB5A9]/40 bg-[#E1D4C2]/40 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#A78D78]/20 dark:bg-[#2D211A]"
        >
            {/* Number */}
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#6E473B] text-sm font-bold text-[#E1D4C2] transition-colors group-hover:bg-[#A78D78] group-hover:text-[#291C0E] dark:bg-[#A78D78] dark:text-[#291C0E]">
                {index + 1}
            </div>

            <h2 className="text-xl font-semibold text-[#291C0E] dark:text-[#E1D4C2]">
                {title}
            </h2>

            <p className="mt-3 leading-7 text-[#6E473B] dark:text-[#C5B8AA]">
                {content}
            </p>
        </motion.section>
    );
}