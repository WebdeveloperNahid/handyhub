"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    FiArrowUpRight,
    FiCheckCircle,
    FiUsers,
    FiShield,
    FiTarget,
} from "react-icons/fi";

const values = [
    {
        icon: FiShield,
        title: "Trust & Safety",
        description:
            "We focus on creating a reliable environment where customers can confidently connect with service professionals.",
    },
    {
        icon: FiUsers,
        title: "Skilled Professionals",
        description:
            "We help customers discover capable professionals for everyday home services and repair needs.",
    },
    {
        icon: FiTarget,
        title: "Simple Experience",
        description:
            "Our goal is to make finding and requesting a service simple, clear, and convenient.",
    },
];

const features = [
    "Easy service discovery",
    "Verified service professionals",
    "Transparent service experience",
    "Convenient booking process",
];

const AboutUsPage = () => {
    return (
        <main
            className="
                relative isolate overflow-hidden
                bg-[#FAFAF9] text-[#111827]
                transition-colors duration-500
                dark:bg-[#151618] dark:text-[#F9FAFB]
            "
        >
            {/* ================= BACKGROUND GLOWS ================= */}

            <div
                className="
                    pointer-events-none absolute -left-40 top-20 -z-10
                    h-[420px] w-[420px] rounded-full
                    bg-[#15803D]/[0.025] blur-[130px]
                    dark:bg-[#22C55E]/[0.035]
                "
            />

            <div
                className="
                    pointer-events-none absolute -right-40 top-[45%] -z-10
                    h-[420px] w-[420px] rounded-full
                    bg-[#F59E0B]/[0.018] blur-[130px]
                    dark:bg-[#F59E0B]/[0.03]
                "
            />

            <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">

                {/* ================= HERO ================= */}

                <motion.section
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
                >
                    {/* Left */}

                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span
                                className="
                                    h-1.5 w-8 rounded-full
                                    bg-[#15803D]
                                    dark:bg-[#22C55E]
                                "
                            />

                            <p
                                className="
                                    !m-0 text-sm font-semibold uppercase
                                    tracking-[0.2em]
                                    !text-[#15803D]
                                    dark:!text-[#22C55E]
                                "
                            >
                                About HandyHub
                            </p>
                        </div>

                        <h1
                            className="
                                !m-0 max-w-3xl
                                text-4xl font-bold tracking-tight
                                !text-[#111827]
                                sm:text-5xl
                                lg:text-6xl
                                dark:!text-[#F9FAFB]
                            "
                        >
                            Making everyday services
                            <span className="text-[#15803D] dark:text-[#22C55E]">
                                {" "}easier.
                            </span>
                        </h1>

                        <p
                            className="
                                !m-0 mt-6 max-w-2xl
                                text-sm leading-7
                                !text-[#4B5563]
                                sm:text-base
                                dark:!text-[#A1A1AA]
                            "
                        >
                            HandyHub is a service platform designed to connect
                            customers with reliable professionals for everyday
                            home services. From quick repairs to regular home
                            maintenance, we make it easier to find the right
                            help when you need it.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/all-services"
                                className="
                                    group inline-flex items-center gap-2
                                    rounded-full
                                    bg-[#15803D]
                                    px-5 py-2.5
                                    text-sm font-semibold !text-white
                                    transition-all duration-300
                                    hover:bg-[#166534]
                                    dark:bg-[#22C55E]
                                    dark:!text-[#151618]
                                    dark:hover:bg-[#16A34A]
                                "
                            >
                                Explore Services

                                <FiArrowUpRight
                                    size={17}
                                    className="
                                        transition-transform duration-300
                                        group-hover:translate-x-1
                                        group-hover:-translate-y-0.5
                                    "
                                />
                            </Link>

                            <Link
                                href="/contact"
                                className="
                                    inline-flex items-center
                                    rounded-full
                                    border border-[#15803D]/25
                                    px-5 py-2.5
                                    text-sm font-semibold
                                    !text-[#15803D]
                                    transition-all duration-300
                                    hover:border-[#15803D]
                                    hover:bg-[#15803D]/[0.05]
                                    dark:border-[#22C55E]/25
                                    dark:!text-[#22C55E]
                                    dark:hover:border-[#22C55E]
                                    dark:hover:bg-[#22C55E]/[0.05]
                                "
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Right visual card */}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="
                            relative overflow-hidden rounded-3xl
                            border border-black/[0.08]
                            bg-white p-7
                            shadow-[0_15px_45px_rgba(0,0,0,0.05)]
                            dark:border-white/[0.08]
                            dark:bg-[#1D1D1F]
                            dark:shadow-[0_15px_45px_rgba(0,0,0,0.2)]
                        "
                    >
                        <div
                            className="
                                absolute right-0 top-0
                                h-32 w-32 rounded-full
                                bg-[#15803D]/[0.07] blur-3xl
                                dark:bg-[#22C55E]/[0.08]
                            "
                        />

                        <div
                            className="
                                relative flex h-14 w-14 items-center
                                justify-center rounded-2xl
                                bg-[#15803D]/[0.08]
                                !text-[#15803D]
                                ring-1 ring-[#15803D]/10
                                dark:bg-[#22C55E]/[0.08]
                                dark:!text-[#22C55E]
                                dark:ring-[#22C55E]/10
                            "
                        >
                            <FiUsers size={25} />
                        </div>

                        <h2
                            className="
                                !m-0 mt-7 text-2xl font-bold
                                !text-[#18181B]
                                dark:!text-[#F4F4F5]
                            "
                        >
                            Connecting people with
                            <span className="text-[#15803D] dark:text-[#22C55E]">
                                {" "}the right help.
                            </span>
                        </h2>

                        <p
                            className="
                                !m-0 mt-4 text-sm leading-7
                                !text-[#4B5563]
                                dark:!text-[#A1A1AA]
                            "
                        >
                            We believe getting help around your home should be
                            straightforward. HandyHub brings customers and
                            service providers together through one simple
                            platform.
                        </p>

                        <div
                            className="
                                mt-7 h-px w-full
                                bg-black/[0.08]
                                dark:bg-white/[0.08]
                            "
                        />

                        <div className="mt-5 flex items-center gap-3">
                            <FiCheckCircle
                                className="!text-[#15803D] dark:!text-[#22C55E]"
                                size={18}
                            />

                            <span
                                className="
                                    text-sm font-medium
                                    !text-[#4B5563]
                                    dark:!text-[#A1A1AA]
                                "
                            >
                                Built around convenience and trust
                            </span>
                        </div>
                    </motion.div>
                </motion.section>

                {/* ================= OUR STORY ================= */}

                <motion.section
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className="mt-24 grid gap-12 lg:grid-cols-2"
                >
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span
                                className="
                                    h-1.5 w-8 rounded-full
                                    bg-[#15803D]
                                    dark:bg-[#22C55E]
                                "
                            />

                            <p
                                className="
                                    !m-0 text-sm font-semibold uppercase
                                    tracking-[0.2em]
                                    !text-[#15803D]
                                    dark:!text-[#22C55E]
                                "
                            >
                                Our Story
                            </p>
                        </div>

                        <h2
                            className="
                                !m-0 text-3xl font-bold tracking-tight
                                !text-[#111827]
                                sm:text-4xl
                                dark:!text-[#F9FAFB]
                            "
                        >
                            A simpler way to get things done
                        </h2>
                    </div>

                    <div className="space-y-5">
                        <p
                            className="
                                !m-0 text-sm leading-7
                                !text-[#4B5563]
                                sm:text-base
                                dark:!text-[#A1A1AA]
                            "
                        >
                            Finding a dependable person for home services can
                            often take time and effort. HandyHub was created to
                            make that process more convenient by bringing useful
                            services and capable professionals together in one
                            place.
                        </p>

                        <p
                            className="
                                !m-0 text-sm leading-7
                                !text-[#4B5563]
                                sm:text-base
                                dark:!text-[#A1A1AA]
                            "
                        >
                            Our platform is built with a focus on simplicity,
                            accessibility, and a better experience for both
                            customers and service providers.
                        </p>
                    </div>
                </motion.section>

                {/* ================= VALUES ================= */}

                <section className="mt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 max-w-2xl"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <span
                                className="
                                    h-1.5 w-8 rounded-full
                                    bg-[#15803D]
                                    dark:bg-[#22C55E]
                                "
                            />

                            <p
                                className="
                                    !m-0 text-sm font-semibold uppercase
                                    tracking-[0.2em]
                                    !text-[#15803D]
                                    dark:!text-[#22C55E]
                                "
                            >
                                What We Value
                            </p>
                        </div>

                        <h2
                            className="
                                !m-0 text-3xl font-bold tracking-tight
                                !text-[#111827]
                                sm:text-4xl
                                dark:!text-[#F9FAFB]
                            "
                        >
                            Built around people and reliability
                        </h2>

                        <p
                            className="
                                !m-0 mt-4 text-sm leading-7
                                !text-[#4B5563]
                                dark:!text-[#A1A1AA]
                            "
                        >
                            Everything we do is focused on making local
                            services easier to discover and easier to use.
                        </p>
                    </motion.div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {values.map((value, index) => {
                            const Icon = value.icon;

                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{
                                        once: true,
                                        amount: 0.2,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.08,
                                    }}
                                    whileHover={{ y: -5 }}
                                    className="
                                        group relative overflow-hidden
                                        rounded-2xl
                                        border border-black/[0.08]
                                        bg-white p-6
                                        shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                                        transition-all duration-300
                                        hover:border-[#15803D]/30
                                        hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                                        dark:border-white/[0.08]
                                        dark:bg-[#1D1D1F]
                                        dark:hover:border-[#22C55E]/20
                                        dark:hover:bg-[#202123]
                                        dark:shadow-[0_10px_35px_rgba(0,0,0,0.22)]
                                    "
                                >
                                    <span
                                        className="
                                            absolute left-0 top-0 h-[2px] w-0
                                            bg-[#15803D]
                                            transition-all duration-500
                                            group-hover:w-full
                                            dark:bg-[#22C55E]
                                        "
                                    />

                                    <div
                                        className="
                                            flex h-12 w-12 items-center
                                            justify-center rounded-xl
                                            bg-[#15803D]/[0.08]
                                            !text-[#15803D]
                                            ring-1 ring-[#15803D]/10
                                            transition-all duration-300
                                            group-hover:scale-105
                                            group-hover:bg-[#15803D]
                                            group-hover:!text-white
                                            dark:bg-[#22C55E]/[0.08]
                                            dark:!text-[#22C55E]
                                            dark:ring-[#22C55E]/10
                                            dark:group-hover:bg-[#22C55E]
                                            dark:group-hover:!text-[#151618]
                                        "
                                    >
                                        <Icon size={21} />
                                    </div>

                                    <h3
                                        className="
                                            !m-0 mt-7 text-lg font-semibold
                                            !text-[#18181B]
                                            dark:!text-[#F4F4F5]
                                        "
                                    >
                                        {value.title}
                                    </h3>

                                    <p
                                        className="
                                            !m-0 mt-2 text-sm leading-6
                                            !text-[#4B5563]
                                            dark:!text-[#A1A1AA]
                                        "
                                    >
                                        {value.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ================= WHY HANDYHUB ================= */}

                <motion.section
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className="
                        mt-24 grid items-center gap-10
                        rounded-3xl
                        border border-black/[0.08]
                        bg-white p-7
                        dark:border-white/[0.08]
                        dark:bg-[#1D1D1F]
                        sm:p-10
                        lg:grid-cols-2
                    "
                >
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span
                                className="
                                    h-1.5 w-8 rounded-full
                                    bg-[#15803D]
                                    dark:bg-[#22C55E]
                                "
                            />

                            <p
                                className="
                                    !m-0 text-sm font-semibold uppercase
                                    tracking-[0.2em]
                                    !text-[#15803D]
                                    dark:!text-[#22C55E]
                                "
                            >
                                Why HandyHub
                            </p>
                        </div>

                        <h2
                            className="
                                !m-0 text-3xl font-bold tracking-tight
                                !text-[#111827]
                                sm:text-4xl
                                dark:!text-[#F9FAFB]
                            "
                        >
                            Everything you need,
                            <span className="text-[#15803D] dark:text-[#22C55E]">
                                {" "}in one place.
                            </span>
                        </h2>

                        <p
                            className="
                                !m-0 mt-4 max-w-xl text-sm leading-7
                                !text-[#4B5563]
                                dark:!text-[#A1A1AA]
                            "
                        >
                            Whether you need a quick repair or regular home
                            support, HandyHub helps you find the service you
                            need without making the process complicated.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {features.map((feature) => (
                            <div
                                key={feature}
                                className="
                                    flex items-center gap-3 rounded-xl
                                    border border-black/[0.06]
                                    bg-[#FAFAF9] p-4
                                    dark:border-white/[0.06]
                                    dark:bg-[#202123]
                                "
                            >
                                <FiCheckCircle
                                    size={18}
                                    className="
                                        shrink-0
                                        !text-[#15803D]
                                        dark:!text-[#22C55E]
                                    "
                                />

                                <span
                                    className="
                                        text-sm font-medium
                                        !text-[#374151]
                                        dark:!text-[#D4D4D8]
                                    "
                                >
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* ================= CTA ================= */}

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mt-20 text-center"
                >
                    <h2
                        className="
                            !m-0 text-3xl font-bold tracking-tight
                            !text-[#111827]
                            sm:text-4xl
                            dark:!text-[#F9FAFB]
                        "
                    >
                        Ready to find the right service?
                    </h2>

                    <p
                        className="
                            !m-0 mx-auto mt-4 max-w-xl text-sm leading-7
                            !text-[#4B5563]
                            dark:!text-[#A1A1AA]
                        "
                    >
                        Explore available services and connect with the right
                        professional for your needs.
                    </p>

                    <Link
                        href="/all-services"
                        className="
                            group mt-7 inline-flex items-center gap-2
                            rounded-full
                            border border-[#15803D]/25
                            px-5 py-2.5
                            text-sm font-semibold
                            !text-[#15803D]
                            transition-all duration-300
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
                        Browse Services

                        <FiArrowUpRight
                            size={17}
                            className="
                                transition-transform duration-300
                                group-hover:translate-x-1
                                group-hover:-translate-y-0.5
                            "
                        />
                    </Link>
                </motion.section>
            </div>
        </main>
    );
};

export default AboutUsPage;