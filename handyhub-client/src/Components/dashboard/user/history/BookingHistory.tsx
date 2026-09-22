"use client";

import { useState } from "react";
import {
    CalendarDays,
    CheckCircle2,
    ClipboardList,
    XCircle,
} from "lucide-react";

import BookingHistoryTable from "./BookingHistoryTable";
import BookingHistoryPagination from "./BookingHistoryPagination";

export interface Booking {
    id: string;
    serviceName: string;
    providerName: string;
    date: string;
    price: number;
    status: "Completed" | "Cancelled";
}

const BookingHistory = () => {
    const [bookings] = useState<Booking[]>([
        {
            id: "BK-001",
            serviceName: "Home Cleaning",
            providerName: "John Doe",
            date: "Sep 18, 2026",
            price: 1200,
            status: "Completed",
        },
        {
            id: "BK-002",
            serviceName: "AC Repair",
            providerName: "Rahim Ahmed",
            date: "Sep 15, 2026",
            price: 1800,
            status: "Completed",
        },
        {
            id: "BK-003",
            serviceName: "Plumbing Service",
            providerName: "Karim Hasan",
            date: "Sep 10, 2026",
            price: 900,
            status: "Completed",
        },
        {
            id: "BK-004",
            serviceName: "Electrician Service",
            providerName: "Sakib Khan",
            date: "Sep 05, 2026",
            price: 1500,
            status: "Cancelled",
        },
        {
            id: "BK-005",
            serviceName: "Painting Service",
            providerName: "Hasan Ali",
            date: "Aug 30, 2026",
            price: 2500,
            status: "Cancelled",
        },
        {
            id: "BK-006",
            serviceName: "Gardening Service",
            providerName: "Rafiq Ahmed",
            date: "Aug 25, 2026",
            price: 1000,
            status: "Completed",
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const totalPages = Math.ceil(bookings.length / itemsPerPage);

    const paginatedBookings = bookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const completedBookings = bookings.filter(
        (booking) => booking.status === "Completed"
    ).length;

    const cancelledBookings = bookings.filter(
        (booking) => booking.status === "Cancelled"
    ).length;

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

            {/* History Table */}
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