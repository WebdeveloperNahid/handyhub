"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
    FiArrowLeft,
    FiArrowRight,
    FiCheck,
    FiHome,
    FiStar,
    FiTool,
    FiUsers,
    FiDroplet,
    FiZap,
    FiWind,
    FiEdit3,
    FiShield,
    FiCalendar,
    FiClock,
} from "react-icons/fi";

const slides = [
    {
        id: 1,
        badge: "HANDYHUB • EVERYDAY SERVICES",
        title: "Need a hand?",
        highlight: "Find the right one.",
        description:
            "Connect with trusted professionals for the services your everyday life needs.",
        button: "Browse Services",
        icon: FiTool,
        type: "provider",
    },
    {
        id: 2,
        badge: "HOME • REPAIR • CARE",
        title: "Your home,",
        highlight: "taken care of.",
        description:
            "From plumbing and electrical work to cleaning and repairs, get the help you need.",
        button: "Explore Services",
        icon: FiHome,
        type: "services",
    },
    {
        id: 3,
        badge: "TRUSTED PROFESSIONALS",
        title: "Skills you need.",
        highlight: "People you can trust.",
        description:
            "Discover skilled service providers and choose with confidence through ratings and reviews.",
        button: "Meet Service Providers",
        icon: FiUsers,
        type: "trust",
    },
    {
        id: 4,
        badge: "SIMPLE • FAST • CONVENIENT",
        title: "From request",
        highlight: "to done.",
        description:
            "Find a service, connect with a professional, and get your task completed without the hassle.",
        button: "Get Started",
        icon: FiCheck,
        type: "booking",
    },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 6000);

        return () => clearInterval(interval);
    }, []);

    const slide = slides[current];
    const Icon = slide.icon;

    return (
        <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#E1D4C2] text-[#291C0E] transition-colors duration-500 dark:bg-[#1F1712] dark:text-[#E1D4C2]">
            {/* Background blobs */}
            <motion.div
                animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#6E473B]/10 blur-3xl dark:bg-[#A78D78]/10"
            />

            <motion.div
                animate={{
                    x: [0, -25, 0],
                    y: [0, 25, 0],
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#A78D78]/15 blur-3xl dark:bg-[#6E473B]/15"
            />

            {/* Decorative dots */}
            <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-[#6E473B]/40 dark:bg-[#A78D78]/40"
            />

            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute right-[15%] top-[18%] h-3 w-3 rounded-full bg-[#A78D78]/40"
            />

            <div className="relative z-10  flex min-h-[calc(100vh-4rem)] mx-auto max-w-6xl items-center px-5 py-20 sm:px-8 lg:px-10">
                <div className="grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-20">
                    {/* LEFT */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, x: -35 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 35 }}
                            transition={{
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {/* Badge */}
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#6E473B]/20 bg-white/30 px-4 py-2 text-xs font-semibold tracking-wider text-[#6E473B] backdrop-blur-sm dark:border-[#A78D78]/20 dark:bg-[#2D211A]/60 dark:text-[#A78D78]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#6E473B] dark:bg-[#A78D78]" />
                                {slide.badge}
                            </span>

                            {/* Heading */}
                            <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                                {slide.title}
                                <br />
                                <span className="text-[#6E473B] dark:text-[#A78D78]">
                                    {slide.highlight}
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="mt-6 max-w-xl text-base leading-7 text-[#6E473B] sm:text-lg dark:text-[#C5B8AA]">
                                {slide.description}
                            </p>

                            {/* CTA */}
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Link
                                    href="/all-services"
                                    className="group inline-flex items-center gap-2 rounded-xl bg-[#6E473B] px-6 py-3.5 text-sm font-semibold text-[#E1D4C2] shadow-lg shadow-[#6E473B]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#A78D78] hover:text-[#291C0E] hover:shadow-xl"
                                >
                                    {slide.button}

                                    <FiArrowRight
                                        size={17}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </Link>

                                <span className="text-sm text-[#6E473B]/70 dark:text-[#C5B8AA]/70">
                                    Trusted • Simple • Convenient
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* RIGHT VISUAL */}
                    <div className="relative flex min-h-[400px] items-center justify-center">
                        {/* Glow */}
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute h-72 w-72 rounded-full bg-[#A78D78]/20 blur-3xl sm:h-96 sm:w-96"
                        />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slide.id}
                                initial={{ opacity: 0, x: 35, scale: 0.94 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -35, scale: 0.94 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="relative w-full max-w-md"
                            >
                                {/* Main Card */}
                                <div className="relative overflow-hidden rounded-[2rem] border border-[#6E473B]/15 bg-white/40 p-5 shadow-2xl backdrop-blur-xl dark:border-[#A78D78]/15 dark:bg-[#2D211A]/75">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6E473B] text-[#E1D4C2] dark:bg-[#A78D78] dark:text-[#291C0E]">
                                                <Icon size={20} />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold">
                                                    HandyHub
                                                </p>
                                                <p className="text-xs text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                                                    Service marketplace
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A78D78]/20">
                                            <span className="h-2 w-2 rounded-full bg-[#6E473B] dark:bg-[#A78D78]" />
                                        </div>
                                    </div>

                                    {/* Slide Visual */}
                                    <div className="mt-6">
                                        {slide.type === "provider" && <ProviderVisual />}
                                        {slide.type === "services" && <ServicesVisual />}
                                        {slide.type === "trust" && <TrustVisual />}
                                        {slide.type === "booking" && <BookingVisual />}
                                    </div>
                                </div>

                                {/* Floating Notification */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute -right-5 top-20 rounded-2xl border border-[#6E473B]/15 bg-white/70 p-3 shadow-xl backdrop-blur-xl dark:border-[#A78D78]/15 dark:bg-[#382820]/90"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A78D78]/20">
                                            <FiCheck
                                                size={15}
                                                className="text-[#6E473B] dark:text-[#A78D78]"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold">
                                                All set!
                                            </p>
                                            <p className="text-[10px] text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                                                Service confirmed
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Slider Controls */}
                <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-5">
                    <button
                        onClick={prevSlide}
                        aria-label="Previous slide"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#6E473B]/20 bg-white/30 text-[#6E473B] backdrop-blur-sm transition-all hover:bg-[#6E473B] hover:text-[#E1D4C2] dark:border-[#A78D78]/20 dark:bg-[#2D211A]/60 dark:text-[#A78D78] dark:hover:bg-[#A78D78] dark:hover:text-[#291C0E]"
                    >
                        <FiArrowLeft size={16} />
                    </button>

                    {/* Dots */}
                    <div className="flex items-center gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-500 ${current === index
                                    ? "w-8 bg-[#6E473B] dark:bg-[#A78D78]"
                                    : "w-1.5 bg-[#6E473B]/30 dark:bg-[#A78D78]/30"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextSlide}
                        aria-label="Next slide"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#6E473B]/20 bg-white/30 text-[#6E473B] backdrop-blur-sm transition-all hover:bg-[#6E473B] hover:text-[#E1D4C2] dark:border-[#A78D78]/20 dark:bg-[#2D211A]/60 dark:text-[#A78D78] dark:hover:bg-[#A78D78] dark:hover:text-[#291C0E]"
                    >
                        <FiArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}


/* Provider Visual                */
function ProviderVisual() {
    return (
        <div className="relative min-h-[300px] w-full">
            {/* Main profile card */}
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-4 top-6 w-[260px] rounded-2xl border border-[#6E473B]/10 bg-white/90 p-5 shadow-xl backdrop-blur-md dark:border-[#A78D78]/10 dark:bg-[#30221C]"
            >
                {/* Profile header */}
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#291C0E] dark:bg-[#A78D78]">
                        <FiUsers
                            size={21}
                            className="text-[#E1D4C2] dark:text-[#291C0E]"
                        />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-[#291C0E] dark:text-[#E1D4C2]">
                            Rahim Ahmed
                        </p>

                        <p className="text-xs text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                            Home Repair Specialist
                        </p>
                    </div>

                    <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#A78D78]/15">
                        <FiCheck
                            size={13}
                            className="text-[#6E473B] dark:text-[#A78D78]"
                        />
                    </div>
                </div>

                {/* Rating */}
                <div className="mt-5 flex items-center justify-between border-t border-[#6E473B]/10 pt-4 dark:border-[#A78D78]/10">
                    <div>
                        <p className="text-xs text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                            Rating
                        </p>

                        <div className="mt-1 flex items-center gap-1">
                            <FiStar
                                size={13}
                                className="fill-current text-[#A78D78]"
                            />
                            <span className="text-sm font-semibold">
                                4.9
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                            Completed
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                            120+ jobs
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Service request card */}
            <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                }}
                className="absolute bottom-5 right-0 w-[210px] rounded-2xl border border-[#6E473B]/10 bg-white/95 p-4 shadow-lg backdrop-blur-md dark:border-[#A78D78]/10 dark:bg-[#382820]"
            >
                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                        New request
                    </span>

                    <span className="h-2 w-2 rounded-full bg-[#A78D78]" />
                </div>

                <div className="mt-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#A78D78]/15">
                        <FiTool
                            size={17}
                            className="text-[#6E473B] dark:text-[#A78D78]"
                        />
                    </div>

                    <div>
                        <p className="text-sm font-semibold">
                            Plumbing Service
                        </p>

                        <p className="text-xs text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                            Today · 10:30 AM
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Verified floating badge */}
            <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-0 left-1 rounded-xl border border-[#6E473B]/10 bg-white/90 px-3 py-2 shadow-md backdrop-blur-md dark:border-[#A78D78]/10 dark:bg-[#30221C]"
            >
                <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A78D78]/15">
                        <FiShield
                            size={13}
                            className="text-[#6E473B] dark:text-[#A78D78]"
                        />
                    </div>

                    <div>
                        <p className="text-[10px] text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                            HandyHub
                        </p>

                        <p className="text-xs font-semibold">
                            Verified Provider
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

/* Services Visual                */
function ServicesVisual() {
    const services = [
        {
            icon: FiDroplet,
            name: "Plumbing",
        },
        {
            icon: FiZap,
            name: "Electrical",
        },
        {
            icon: FiWind,
            name: "Cleaning",
        },
        {
            icon: FiEdit3,
            name: "Painting",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {services.map((service, index) => {
                const ServiceIcon = service.icon;

                return (
                    <motion.div
                        key={service.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: index * 0.1,
                            duration: 0.5,
                        }}
                        whileHover={{
                            y: -5,
                            scale: 1.02,
                        }}
                        className="group rounded-2xl border border-[#6E473B]/10 bg-white/50 p-5 backdrop-blur-sm transition-colors dark:border-[#A78D78]/10 dark:bg-[#382820]/70"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6E473B]/10 text-[#6E473B] transition-colors group-hover:bg-[#6E473B] group-hover:text-[#E1D4C2] dark:bg-[#A78D78]/10 dark:text-[#A78D78] dark:group-hover:bg-[#A78D78] dark:group-hover:text-[#291C0E]">
                            <ServiceIcon size={21} />
                        </div>

                        <p className="mt-4 text-sm font-semibold">
                            {service.name}
                        </p>

                        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                            <FiCheck size={12} />
                            Available
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

/* Trust Visual                   */
function TrustVisual() {
    return (
        <div className="relative min-h-[270px]">
            {/* Main provider */}
            <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-1/2 top-2 flex -translate-x-1/2 flex-col items-center"
            >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#6E473B] shadow-xl dark:bg-[#A78D78]">
                    <FiUsers
                        size={38}
                        className="text-[#E1D4C2] dark:text-[#291C0E]"
                    />
                </div>

                <p className="mt-3 text-sm font-bold">
                    Service Professional
                </p>

                <div className="mt-2 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FiStar
                            key={star}
                            size={13}
                            className="fill-current text-[#A78D78]"
                        />
                    ))}

                    <span className="ml-1 text-xs font-semibold">
                        4.9
                    </span>
                </div>
            </motion.div>

            {/* Completed jobs */}
            <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-5 left-0 rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-md dark:bg-[#382820]"
            >
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A78D78]/20">
                        <FiCheck size={15} />
                    </div>

                    <div>
                        <p className="text-xs font-semibold">
                            156 completed jobs
                        </p>

                        <p className="mt-1 text-[10px] text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                            Verified professional
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Review */}
            <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-10 right-0 rounded-2xl bg-[#291C0E] p-4 text-[#E1D4C2] shadow-lg dark:bg-[#A78D78] dark:text-[#291C0E]"
            >
                <div className="flex items-center gap-1">
                    <FiStar
                        size={13}
                        className="fill-current"
                    />

                    <span className="text-xs font-semibold">
                        5.0 Rating
                    </span>
                </div>

                <p className="mt-2 text-[10px] opacity-70">
                    Excellent service!
                </p>
            </motion.div>
        </div>
    );
}

/* Booking Visual                 */
function BookingVisual() {
    const steps = [
        {
            number: "01",
            title: "Request",
            description: "Tell us what you need",
            icon: FiTool,
        },
        {
            number: "02",
            title: "Connect",
            description: "Find the right professional",
            icon: FiUsers,
        },
        {
            number: "03",
            title: "Done",
            description: "Get your task completed",
            icon: FiCheck,
        },
    ];

    return (
        <div className="relative space-y-3">
            {steps.map((step, index) => {
                const StepIcon = step.icon;

                return (
                    <motion.div
                        key={step.number}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: index * 0.15,
                            duration: 0.5,
                        }}
                        className="flex items-center gap-4 rounded-2xl border border-[#6E473B]/10 bg-white/50 p-3 dark:border-[#A78D78]/10 dark:bg-[#382820]/70"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6E473B] text-[#E1D4C2] dark:bg-[#A78D78] dark:text-[#291C0E]">
                            <StepIcon size={18} />
                        </div>

                        <div>
                            <p className="text-sm font-semibold">
                                {step.title}
                            </p>

                            <p className="mt-0.5 text-xs text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                                {step.description}
                            </p>
                        </div>

                        {index === steps.length - 1 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.7 }}
                                className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#A78D78]/20"
                            >
                                <FiCheck size={14} />
                            </motion.div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
