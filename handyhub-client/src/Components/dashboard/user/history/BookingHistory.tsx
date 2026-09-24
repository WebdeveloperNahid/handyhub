"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
    CalendarDays,
    CheckCircle2,
    ClipboardList,
    XCircle,
} from "lucide-react";

import { getMyBookings } from "@/lib/booking_API";

import BookingHistoryTable from "./BookingHistoryTable";
import BookingHistoryPagination from "./BookingHistoryPagination";

export interface Booking {
    id: string;
    serviceName: string;
    serviceImage?: string;
    providerName: string;
    date: string;
    price: number;
    status: "Completed" | "Cancelled" | "Rejected";
}

interface RawBooking {
    _id: string;
    serviceName?: string;
    serviceTitle?: string;
    serviceImage?: string;
    providerName?: string;
    bookingDate: string;
    price: number;
    status?: string;
}

const BookingHistory = () => {
    const { data: session, isPending: sessionLoading } = useSession();

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (sessionLoading) return;

        if (!session?.session?.token) {
            setIsLoading(false);
            return;
        }

        const fetchHistory = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response = await getMyBookings(session.session.token);
                const rawData: RawBooking[] = response?.data || [];

                const historyBookings: Booking[] = rawData
                    .filter((item) =>
                        ["completed", "cancelled", "rejected"].includes(
                            item.status?.toLowerCase() || ""
                        )
                    )
                    .map((item) => ({
                        id: item._id,
                        serviceName: item.serviceName || item.serviceTitle || "Service",
                        serviceImage: item.serviceImage,
                        providerName: item.providerName || "Provider",
                        date: item.bookingDate,
                        price: item.price,
                        status: (item.status!.charAt(0).toUpperCase() +
                            item.status!.slice(1).toLowerCase()) as Booking["status"],
                    }));

                setBookings(historyBookings);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load booking history."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [session, sessionLoading]);

    const totalPages = Math.ceil(bookings.length / itemsPerPage);

    const paginatedBookings = bookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const completedBookings = bookings.filter(
        (booking) => booking.status === "Completed"
    ).length;

    const cancelledBookings = bookings.filter(
        (booking) => booking.status === "Cancelled" || booking.status === "Rejected"
    ).length;

    if (sessionLoading || isLoading) {
        return (
            <div className="space-y-4">
                <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
                <div className="h-40 animate-pulse rounded-2xl bg-gray-100 dark:bg-zinc-800" />
            </div>
        );
    }

    return (
        <div className="space-y-7">
            {/* Page Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                            <ClipboardList size={19} />
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-[#111827] dark:text-[#F4F4F5]">
                            Booking History
                        </h1>
                    </div>

                    <p className="mt-2 text-sm text-[#6B7280] dark:text-[#A1A1AA]">
                        Review your previous service bookings and their status.
                    </p>
                </div>

                <div className="flex items-center gap-2 self-start rounded-full border border-black/[0.06] bg-white px-3.5 py-2 text-sm font-medium text-[#374151] dark:border-white/[0.06] dark:bg-[#18181B] dark:text-[#D4D4D8] sm:self-auto">
                    <CalendarDays
                        size={16}
                        className="text-[#15803D] dark:text-[#22C55E]"
                    />

                    <span>{bookings.length} Total Bookings</span>
                </div>
            </div>

            {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Summary */}
            {bookings.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-3">
                    <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.06] dark:bg-[#18181B]">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                            <ClipboardList size={18} />
                        </div>

                        <div>
                            <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">
                                Total
                            </p>

                            <p className="mt-0.5 text-lg font-semibold text-[#111827] dark:text-[#F4F4F5]">
                                {bookings.length}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.06] dark:bg-[#18181B]">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                            <CheckCircle2 size={18} />
                        </div>

                        <div>
                            <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">
                                Completed
                            </p>

                            <p className="mt-0.5 text-lg font-semibold text-[#111827] dark:text-[#F4F4F5]">
                                {completedBookings}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.06] dark:bg-[#18181B]">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                            <XCircle size={18} />
                        </div>

                        <div>
                            <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">
                                Cancelled
                            </p>

                            <p className="mt-0.5 text-lg font-semibold text-[#111827] dark:text-[#F4F4F5]">
                                {cancelledBookings}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* History List */}
            {bookings.length === 0 ? (
                <div className="rounded-2xl border border-black/[0.06] bg-white px-6 py-20 text-center dark:border-white/[0.06] dark:bg-[#18181B]">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                        <ClipboardList size={22} />
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-[#111827] dark:text-[#F4F4F5]">
                        No Booking History
                    </h2>

                    <p className="mx-auto mt-1.5 max-w-sm text-sm text-[#6B7280] dark:text-[#A1A1AA]">
                        Your completed and cancelled bookings will appear here.
                    </p>
                </div>
            ) : (
                <>
                    <BookingHistoryTable bookings={paginatedBookings} />

                    {totalPages > 1 && (
                        <BookingHistoryPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default BookingHistory;