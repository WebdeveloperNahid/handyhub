"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    FiFacebook,
    FiGithub,
    FiInstagram,
    FiLinkedin,
    FiMail,
    FiMapPin,
    FiPhone,
    FiArrowUpRight,
    FiTool,
} from "react-icons/fi";

const services = [
    "Plumbing",
    "Electrical",
    "Cleaning",
    "Painting",
    "Home Repair",
    "Appliance Repair",
];

const company = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Browse Services",
        href: "/all-services",
    },
    {
        name: "About Us",
        href: "/about",
    },
    {
        name: "Contact",
        href: "/contact",
    },
];

const socialLinks = [
    {
        name: "Facebook",
        href: "#",
        icon: FiFacebook,
    },
    {
        name: "Instagram",
        href: "#",
        icon: FiInstagram,
    },
    {
        name: "LinkedIn",
        href: "#",
        icon: FiLinkedin,
    },
    {
        name: "GitHub",
        href: "#",
        icon: FiGithub,
    },
];

export default function Footer() {
    return (
        <footer
            className="
                relative
                overflow-hidden

                border-t
                border-black/[0.07]

                bg-[#F4F5F3]
                text-[#181A19]

                dark:border-white/[0.07]
                dark:bg-[#151617]
                dark:text-[#F4F4F5]

                transition-colors
                duration-500
            "
        >
            {/* =====================================================
                SUBTLE BACKGROUND GLOW
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    bottom-0
                    h-[300px]
                    w-[300px]
                    rounded-full

                    bg-[#15803D]/[0.025]

                    blur-[120px]

                    dark:bg-[#22C55E]/[0.035]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    top-0
                    h-[300px]
                    w-[300px]
                    rounded-full

                    bg-[#F59E0B]/[0.015]

                    blur-[120px]

                    dark:bg-[#F59E0B]/[0.025]
                "
            />

            <div className="relative mx-auto max-w-6xl px-4">

                {/* =====================================================
                    MAIN FOOTER
                ====================================================== */}

                <div
                    className="
                        grid
                        gap-12
                        py-16

                        sm:grid-cols-2

                        lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]
                        lg:gap-10
                    "
                >
                    {/* =================================================
                        BRAND
                    ================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                        }}
                    >
                        {/* Logo */}

                        <Link
                            href="/"
                            className="
                                group
                                inline-flex
                                items-center
                                gap-3
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl

                                    bg-[#15803D]
                                    text-white

                                    dark:bg-[#22C55E]
                                    dark:text-[#111312]

                                    transition-transform
                                    duration-300

                                    group-hover:scale-105
                                "
                            >
                                <FiTool size={20} />
                            </div>

                            <span
                                className="
                                    text-xl
                                    font-bold
                                    tracking-tight

                                    !text-[#181A19]

                                    dark:!text-[#F4F4F5]
                                "
                            >
                                HandyHub
                            </span>
                        </Link>

                        {/* Description */}

                        <p
                            className="
                                mt-5
                                max-w-sm

                                text-sm
                                leading-7

                                !text-[#59605C]

                                dark:!text-[#9EA49F]
                            "
                        >
                            Simple, trusted and convenient services for
                            everyday tasks. Connect with skilled professionals
                            and get the job done without the hassle.
                        </p>

                        {/* Social Icons */}

                        <div className="mt-6 flex items-center gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        aria-label={social.name}
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-full

                                            border
                                            border-black/[0.08]

                                            bg-white/50

                                            !text-[#59605C]

                                            transition-all
                                            duration-300

                                            hover:border-[#15803D]/30
                                            hover:bg-[#15803D]
                                            hover:!text-white

                                            dark:border-white/[0.08]
                                            dark:bg-white/[0.03]
                                            dark:!text-[#9EA49F]

                                            dark:hover:border-[#22C55E]
                                            dark:hover:bg-[#22C55E]
                                            dark:hover:!text-[#111312]
                                        "
                                    >
                                        <Icon size={16} />
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* =================================================
                        SERVICES
                    ================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.1,
                        }}
                    >
                        <h3
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-[0.16em]

                                !text-[#181A19]

                                dark:!text-[#F4F4F5]
                            "
                        >
                            Services
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {services.map((service) => (
                                <li key={service}>
                                    <Link
                                        href="/all-services"
                                        className="
                                            group
                                            inline-flex
                                            items-center
                                            gap-1

                                            text-sm

                                            !text-[#59605C]

                                            transition-colors
                                            duration-200

                                            hover:!text-[#15803D]

                                            dark:!text-[#9EA49F]

                                            dark:hover:!text-[#22C55E]
                                        "
                                    >
                                        {service}

                                        <FiArrowUpRight
                                            size={13}
                                            className="
                                                opacity-0
                                                -translate-x-1

                                                transition-all
                                                duration-200

                                                group-hover:translate-x-0
                                                group-hover:opacity-100
                                            "
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* =================================================
                        COMPANY
                    ================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.2,
                        }}
                    >
                        <h3
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-[0.16em]

                                !text-[#181A19]

                                dark:!text-[#F4F4F5]
                            "
                        >
                            Company
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="
                                            group
                                            inline-flex
                                            items-center
                                            gap-1

                                            text-sm

                                            !text-[#59605C]

                                            transition-colors
                                            duration-200

                                            hover:!text-[#15803D]

                                            dark:!text-[#9EA49F]

                                            dark:hover:!text-[#22C55E]
                                        "
                                    >
                                        {item.name}

                                        <FiArrowUpRight
                                            size={13}
                                            className="
                                                opacity-0
                                                -translate-x-1

                                                transition-all
                                                duration-200

                                                group-hover:translate-x-0
                                                group-hover:opacity-100
                                            "
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* =================================================
                        CONTACT
                    ================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.3,
                        }}
                    >
                        <h3
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-[0.16em]

                                !text-[#181A19]

                                dark:!text-[#F4F4F5]
                            "
                        >
                            Get in touch
                        </h3>

                        <div className="mt-5 space-y-4">

                            {/* Email */}

                            <a
                                href="mailto:hello@handyhub.com"
                                className="
                                    group
                                    flex
                                    items-start
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg

                                        bg-[#15803D]/[0.07]

                                        !text-[#15803D]

                                        dark:bg-[#22C55E]/[0.08]

                                        dark:!text-[#22C55E]
                                    "
                                >
                                    <FiMail size={16} />
                                </div>

                                <div>
                                    <p
                                        className="
                                            !m-0
                                            text-xs

                                            !text-[#8A918C]

                                            dark:!text-[#777D79]
                                        "
                                    >
                                        Email
                                    </p>

                                    <p
                                        className="
                                            !m-0
                                            mt-1
                                            text-sm

                                            !text-[#59605C]

                                            group-hover:!text-[#15803D]

                                            dark:!text-[#D0D3D1]

                                            dark:group-hover:!text-[#22C55E]
                                        "
                                    >
                                        hello@handyhub.com
                                    </p>
                                </div>
                            </a>

                            {/* Phone */}

                            <a
                                href="tel:+8801000000000"
                                className="
                                    group
                                    flex
                                    items-start
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg

                                        bg-[#15803D]/[0.07]

                                        !text-[#15803D]

                                        dark:bg-[#22C55E]/[0.08]

                                        dark:!text-[#22C55E]
                                    "
                                >
                                    <FiPhone size={16} />
                                </div>

                                <div>
                                    <p
                                        className="
                                            !m-0
                                            text-xs

                                            !text-[#8A918C]

                                            dark:!text-[#777D79]
                                        "
                                    >
                                        Phone
                                    </p>

                                    <p
                                        className="
                                            !m-0
                                            mt-1
                                            text-sm

                                            !text-[#59605C]

                                            group-hover:!text-[#15803D]

                                            dark:!text-[#D0D3D1]

                                            dark:group-hover:!text-[#22C55E]
                                        "
                                    >
                                        +880 1000-000000
                                    </p>
                                </div>
                            </a>

                            {/* Location */}

                            <div className="flex items-start gap-3">
                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg

                                        bg-[#15803D]/[0.07]

                                        !text-[#15803D]

                                        dark:bg-[#22C55E]/[0.08]

                                        dark:!text-[#22C55E]
                                    "
                                >
                                    <FiMapPin size={16} />
                                </div>

                                <div>
                                    <p
                                        className="
                                            !m-0
                                            text-xs

                                            !text-[#8A918C]

                                            dark:!text-[#777D79]
                                        "
                                    >
                                        Location
                                    </p>

                                    <p
                                        className="
                                            !m-0
                                            mt-1
                                            text-sm

                                            !text-[#59605C]

                                            dark:!text-[#D0D3D1]
                                        "
                                    >
                                        Rajshahi, Bangladesh
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* =====================================================
                    DIVIDER
                ====================================================== */}

                <div
                    className="
                        h-px
                        w-full

                        bg-black/[0.07]

                        dark:bg-white/[0.07]
                    "
                />

                {/* =====================================================
                    BOTTOM FOOTER
                ====================================================== */}

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        py-6

                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <p
                        className="
                            !m-0
                            text-xs

                            !text-[#7A817D]

                            dark:!text-[#777D79]
                        "
                    >
                        © {new Date().getFullYear()} HandyHub. All rights
                        reserved.
                    </p>

                    <div className="flex items-center gap-5">
                        <Link
                            href="/privacy"
                            className="
                                text-xs

                                !text-[#7A817D]

                                hover:!text-[#15803D]

                                dark:!text-[#777D79]

                                dark:hover:!text-[#22C55E]
                            "
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="
                                text-xs

                                !text-[#7A817D]

                                hover:!text-[#15803D]

                                dark:!text-[#777D79]

                                dark:hover:!text-[#22C55E]
                            "
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}