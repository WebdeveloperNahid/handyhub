"use client";

import { useState } from "react";
import {
    FiCalendar,
    FiMessageCircle,
} from "react-icons/fi";

import type { ProviderService } from "@/types/index";

import BookingModal from "./BookingModal";

interface Props {
    service: ProviderService;
}

const BookingSidebar = ({ service }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <aside>
                <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-lg shadow-black/5 dark:border-white/10 dark:bg-[#27272A] dark:shadow-black/20">

                    {/* Price */}
                    <p className="text-xs font-medium text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                        Starting price
                    </p>

                    <div className="mt-1 flex items-end gap-2">
                        <span className="text-3xl font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                            ৳{Number(service.price).toLocaleString()}
                        </span>

                        <span className="mb-1 text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                            / service
                        </span>
                    </div>

                    {/* Service Info */}
                    <div className="mt-6 border-t border-black/10 pt-6 dark:border-white/10">
                        <p className="text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                            Service
                        </p>

                        <p className="mt-2 text-sm font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                            {service.title}
                        </p>

                        <p className="mt-2 text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                            Duration: {service.duration || "1–2 hrs"}
                        </p>
                    </div>

                    {/* Availability */}
                    {service.availability?.days && service.availability.days.length > 0 && (
                        <div className="mt-6 border-t border-black/10 pt-6 dark:border-white/10">
                            <p className="text-xs font-medium text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                                Available Days
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                                {service.availability.days.map((day) => (
                                    <span
                                        key={day}
                                        className="rounded-lg border border-[#15803D]/20 bg-[#15803D]/5 px-2.5 py-1 text-xs font-semibold text-[#15803D] dark:border-[#22C55E]/20 dark:bg-[#22C55E]/10 dark:text-[#22C55E]"
                                    >
                                        {day}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 space-y-3">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#15803D] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#166534] dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#4ADE80]"
                        >
                            <FiCalendar size={16} />
                            Book this service
                        </button>
                    </div>

                    {/* Note */}
                    <p className="mt-5 text-center text-[11px] leading-5 text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                        Final pricing may depend on the service requirements.
                    </p>
                </div>
            </aside>

            <BookingModal
                service={service}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default BookingSidebar;