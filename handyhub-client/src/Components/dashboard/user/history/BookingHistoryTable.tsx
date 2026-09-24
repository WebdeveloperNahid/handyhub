import Image from "next/image";
import { Chip } from "@heroui/react";
import { ImageOff, Calendar } from "lucide-react";
import type { Booking } from "./BookingHistory";

interface BookingHistoryTableProps {
    bookings: Booking[];
}

const statusColor = (status: Booking["status"]) =>
    status === "Completed" ? "success" : "danger";

const BookingHistoryTable = ({
    bookings,
}: BookingHistoryTableProps) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
                <div
                    key={booking.id}
                    className="
                        group overflow-hidden rounded-2xl border border-black/[0.06]
                        bg-white
                        transition-all duration-300
                        hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5
                        dark:border-white/[0.06] dark:bg-[#18181B]
                        dark:hover:shadow-black/20
                    "
                >
                    <div className="flex gap-4 p-4">
                        {/* Image */}
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#FAFAF9] dark:bg-[#202023]">
                            {booking.serviceImage ? (
                                <Image
                                    src={booking.serviceImage}
                                    alt={booking.serviceName}
                                    fill
                                    sizes="80px"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-[#A1A1AA]">
                                    <ImageOff size={22} />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex-1 space-y-2">
                            <div>
                                <h3 className="line-clamp-1 text-sm font-semibold text-[#111827] dark:text-[#F4F4F5]">
                                    {booking.serviceName}
                                </h3>

                                <p className="mt-0.5 truncate text-xs text-[#6B7280] dark:text-[#A1A1AA]">
                                    {booking.providerName}
                                </p>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] dark:text-[#71717A]">
                                <Calendar size={12} />
                                <span>{booking.date}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer: price + status */}
                    <div
                        className="
                            flex items-center justify-between border-t border-black/[0.06]
                            bg-[#FAFAF9] px-4 py-3
                            dark:border-white/[0.06] dark:bg-[#202023]/60
                        "
                    >
                        <span className="text-base font-bold text-[#111827] dark:text-[#F4F4F5]">
                            ৳{booking.price.toLocaleString()}
                        </span>

                        <Chip
                            size="sm"
                            variant="soft"
                            color={statusColor(booking.status)}
                        >
                            {booking.status}
                        </Chip>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingHistoryTable;