"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    FiArrowUpRight,
    FiClock,
    FiDroplet,
    FiHome,
    FiMonitor,
    FiStar,
    FiTool,
    FiWind,
    FiZap,
} from "react-icons/fi";

type Service = {
    id: string | number;
    title: string;
    category: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    duration: string;
    icon?: string;
};

type ServiceCardProps = {
    services: Service[];
};

const iconMap = {
    plumbing: FiDroplet,
    electrical: FiZap,
    cleaning: FiWind,
    painting: FiHome,
    repair: FiTool,
    appliance: FiMonitor,
};

const ServiceCard = ({ services }: ServiceCardProps) => {
    return (
        <section>
            {services.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => {
                        const Icon =
                            iconMap[
                                service.icon as keyof typeof iconMap
                            ] || FiTool;

                        return (
                            <motion.article
                                key={service.id}
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
                                    amount: 0.15,
                                }}
                                transition={{
                                    duration: 0.55,
                                    delay: index * 0.06,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={{ y: -5 }}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#6E473B]/15 bg-[#E8DDCE] transition-all duration-300 hover:border-[#A78D78]/50 hover:shadow-xl dark:border-white/10 dark:bg-[#241B17]"
                            >
                                {/* Card visual */}
                                <div className="relative flex h-40 items-center justify-center bg-[#291C0E] dark:bg-[#30221C]">
                                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[#A78D78]/20" />

                                    <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full border border-[#A78D78]/15" />

                                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6E473B] text-[#E1D4C2] shadow-lg transition-transform duration-300 group-hover:scale-105">
                                        <Icon
                                            size={28}
                                            strokeWidth={1.6}
                                        />
                                    </div>

                                    <span className="absolute right-4 top-4 rounded-full border border-[#A78D78]/20 bg-white/5 px-3 py-1 text-[11px] font-medium text-[#E1D4C2]">
                                        {service.category}
                                    </span>
                                </div>

                                {/* Card content */}
                                <div className="flex flex-1 flex-col p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-lg font-semibold tracking-tight">
                                            {service.title}
                                        </h3>

                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6E473B]/10 text-[#6E473B] transition-all group-hover:bg-[#6E473B] group-hover:text-[#E1D4C2] dark:bg-white/5 dark:text-[#A78D78]">
                                            <FiArrowUpRight
                                                size={16}
                                            />
                                        </div>
                                    </div>

                                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6E473B]/65 dark:text-[#C5B8AA]/65">
                                        {service.description}
                                    </p>

                                    {/* Rating */}
                                    <div className="mt-5 flex items-center gap-2">
                                        <div className="flex items-center gap-1 text-[#6E473B] dark:text-[#A78D78]">
                                            <FiStar
                                                size={14}
                                                className="fill-current"
                                            />

                                            <span className="text-sm font-semibold">
                                                {service.rating}
                                            </span>
                                        </div>

                                        <span className="text-xs text-[#6E473B]/50 dark:text-[#C5B8AA]/50">
                                            ({service.reviews} reviews)
                                        </span>
                                    </div>

                                    {/* Price + Duration */}
                                    <div className="mt-5 flex items-center justify-between border-t border-[#6E473B]/10 pt-4 dark:border-white/10">
                                        <div>
                                            <p className="text-xs text-[#6E473B]/50 dark:text-[#C5B8AA]/50">
                                                Starting at
                                            </p>

                                            <p className="mt-0.5 text-base font-bold">
                                                ৳{service.price}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-xs text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                                            <FiClock size={13} />
                                            {service.duration}
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <Link
                                        href={`/all-services/${service.id}`}
                                        className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#291C0E] px-4 py-3 text-sm font-semibold text-[#E1D4C2] transition-all duration-300 hover:bg-[#6E473B] dark:bg-[#6E473B] dark:hover:bg-[#A78D78] dark:hover:text-[#291C0E]"
                                    >
                                        View service
                                        <FiArrowUpRight size={15} />
                                    </Link>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-[#6E473B]/25 py-20 text-center dark:border-white/10">
                    <FiTool
                        size={28}
                        className="mx-auto text-[#A78D78]"
                    />

                    <h3 className="mt-4 text-lg font-semibold">
                        No services found
                    </h3>

                    <p className="mt-2 text-sm text-[#6E473B]/60 dark:text-[#C5B8AA]/60">
                        Try another category or search term.
                    </p>
                </div>
            )}
        </section>
    );
};

export default ServiceCard;