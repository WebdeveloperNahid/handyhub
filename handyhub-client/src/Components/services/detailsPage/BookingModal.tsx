"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    FiCalendar,
    FiClock,
    FiMapPin,
    FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";

import type { ProviderService } from "@/types/index";
import { createBooking } from "@/lib/booking_API";
import { useSession } from "@/lib/auth-client";

interface Props {
    service: ProviderService;
    isOpen: boolean;
    onClose: () => void;
}

const BookingModal = ({
    service,
    isOpen,
    onClose,
}: Props) => {
    const router = useRouter();
    const { data: session } = useSession();

    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [address, setAddress] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;
    console.log("SESSION:", session);
    const handleConfirmBooking = async () => {
        if (!session) {
            toast.error("Please login first.");
            return;
        }
        if (!bookingDate) {
            toast.error("Please select a booking date.");
            return;
        }

        if (!bookingTime) {
            toast.error("Please select a booking time.");
            return;
        }

        if (!address.trim()) {
            toast.error("Please enter your service address.");
            return;
        }

        try {
            setIsSubmitting(true);

            await createBooking(
                {
                    serviceId: String(service._id),

                    serviceName: service.title,
                    serviceImage: service.image,
                    serviceCategory: service.category,
                    providerId: String(service.providerId),
                    price: Number(service.price),

                    bookingDate,
                    bookingTime,
                    address: address.trim(),
                },
                session.session.token,
            );

            toast.success("Booking created successfully!");

            setBookingDate("");
            setBookingTime("");
            setAddress("");

            onClose();

            router.push("/dashboard/user/my-bookings");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to create booking.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#27272A]">

                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                            Confirm Booking
                        </h2>

                        <p className="mt-1 text-sm text-[#6B7280] dark:text-[#A1A1AA]">
                            Enter your booking details.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded-full p-2 text-[#6B7280] transition hover:bg-[#15803D]/10 hover:text-[#15803D] disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#A1A1AA] dark:hover:bg-[#22C55E]/10 dark:hover:text-[#22C55E]"
                    >
                        <FiX size={18} />
                    </button>
                </div>

                {/* Service */}
                <div className="mt-6 rounded-2xl bg-[#FAF9F7] p-4 dark:bg-[#18181B]">
                    <p className="text-xs font-medium text-[#15803D] dark:text-[#22C55E]">
                        {service.category}
                    </p>

                    <h3 className="mt-2 text-base font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                        {service.title}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#A1A1AA]">
                            <FiClock size={14} />
                            {service.duration || "1–2 hrs"}
                        </div>

                        <p className="text-lg font-bold text-[#15803D] dark:text-[#22C55E]">
                            ৳{Number(service.price).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Booking Date */}
                <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-medium text-[#1C1917] dark:text-[#F4F4F5]">
                            Booking Date
                        </label>
                        {service.availability?.days && service.availability.days.length > 0 && (
                            <span className="text-[11px] text-[#15803D] dark:text-[#22C55E]">
                                Open: {service.availability.days.join(", ")}
                            </span>
                        )}
                    </div>

                    <div className="relative">
                        <FiCalendar
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-[#A1A1AA]"
                        />

                        <input
                            type="date"
                            value={bookingDate}
                            min={
                                new Date()
                                    .toISOString()
                                    .split("T")[0]
                            }
                            onChange={(e) =>
                                setBookingDate(e.target.value)
                            }
                            disabled={isSubmitting}
                            className="w-full rounded-xl border border-black/10 bg-white px-10 py-3 text-sm text-[#1C1917] outline-none transition focus:border-[#15803D] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
                        />
                    </div>
                </div>

                {/* Booking Time */}
                <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-[#1C1917] dark:text-[#F4F4F5]">
                        Booking Time
                    </label>

                    <div className="relative">
                        <FiClock
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-[#A1A1AA]"
                        />

                        <input
                            type="time"
                            value={bookingTime}
                            onChange={(e) =>
                                setBookingTime(e.target.value)
                            }
                            disabled={isSubmitting}
                            className="w-full rounded-xl border border-black/10 bg-white px-10 py-3 text-sm text-[#1C1917] outline-none transition focus:border-[#15803D] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-[#1C1917] dark:text-[#F4F4F5]">
                        Service Address
                    </label>

                    <div className="relative">
                        <FiMapPin
                            size={16}
                            className="absolute left-3 top-3.5 text-[#6B7280] dark:text-[#A1A1AA]"
                        />

                        <textarea
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                            disabled={isSubmitting}
                            placeholder="Enter your service address"
                            rows={3}
                            className="w-full resize-none rounded-xl border border-black/10 bg-white px-10 py-3 text-sm text-[#1C1917] outline-none transition placeholder:text-[#6B7280]/70 focus:border-[#15803D] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/70 dark:focus:border-[#22C55E]"
                        />
                    </div>
                </div>

                {/* Info */}
                <div className="mt-5 rounded-2xl border border-[#15803D]/20 bg-[#15803D]/5 p-4 dark:border-[#22C55E]/20 dark:bg-[#22C55E]/5">
                    <div className="flex gap-3">
                        <FiCalendar
                            size={18}
                            className="mt-0.5 shrink-0 text-[#15803D] dark:text-[#22C55E]"
                        />

                        <p className="text-xs leading-5 text-[#1C1917]/70 dark:text-[#A1A1AA]">
                            Your booking request will be sent to the
                            service provider for confirmation.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold text-[#1C1917] transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-[#F4F4F5] dark:hover:bg-white/5"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleConfirmBooking}
                        disabled={isSubmitting}
                        className="flex-1 rounded-xl bg-[#15803D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#166534] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#4ADE80]"
                    >
                        {isSubmitting
                            ? "Booking..."
                            : "Confirm Booking"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;