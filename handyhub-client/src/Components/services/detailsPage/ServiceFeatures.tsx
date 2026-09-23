import {
    FiClock,
    FiMapPin,
    FiShield,
} from "react-icons/fi";

import type { ProviderService } from "@/types/index";

interface Props {
    service: ProviderService;
}

const ServiceFeatures = ({ service }: Props) => {
    const features = [
        {
            icon: FiClock,
            label: "Duration",
            value: service.duration || "1–2 hrs",
        },
        {
            icon: FiMapPin,
            label: "Location",
            value: "Your area",
        },
        {
            icon: FiShield,
            label: "Service",
            value: "Verified service",
        },
    ];

    return (
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {features.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.label}
                        className="rounded-2xl border border-black/10 bg-white p-5 transition-colors hover:border-[#15803D]/30 dark:border-white/10 dark:bg-[#27272A] dark:hover:border-[#22C55E]/30"
                    >
                        <Icon
                            size={20}
                            className="text-[#15803D] dark:text-[#22C55E]"
                        />

                        <p className="mt-4 text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                            {item.label}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                            {item.value}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default ServiceFeatures;