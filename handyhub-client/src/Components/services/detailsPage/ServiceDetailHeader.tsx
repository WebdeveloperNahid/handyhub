"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiTool } from "react-icons/fi";

import type { ProviderService } from "@/types/index";

interface Props {
    service: ProviderService;
}

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80";

const ServiceDetailHeader = ({ service }: Props) => {
    const imageUrl = service.image?.trim() || DEFAULT_IMAGE;

    return (
        <div>
            {/* Image */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative h-72 overflow-hidden rounded-3xl sm:h-96"
            >
                <Image
                    src={imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Category */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <FiTool size={14} />
                    {service.category}
                </div>
            </motion.div>

            {/* Details */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-7"
            >
                {/* Category Badge */}
                <span className="inline-flex rounded-full bg-[#15803D]/10 px-3 py-1.5 text-xs font-semibold text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                    {service.category}
                </span>

                {/* Title */}
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1C1917] sm:text-4xl dark:text-[#F4F4F5]">
                    {service.title}
                </h1>

                {/* Description */}
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#1C1917]/70 dark:text-[#A1A1AA] sm:text-base">
                    {service.description}
                </p>
            </motion.div>
        </div>
    );
};

export default ServiceDetailHeader;