import { Chip } from "@heroui/react";
import type { Booking } from "./BookingHistory";

interface BookingHistoryTableProps {
    bookings: Booking[];
}

const BookingHistoryTable = ({
    bookings,
}: BookingHistoryTableProps) => {
    return (
        <div
            className="
                overflow-hidden rounded-2xl
                border border-black/[0.06]
                bg-white
                dark:border-white/[0.06]
                dark:bg-[#18181B]
            "
        >
            <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-sm">
                    <thead
                        className="
                            border-b border-black/[0.06]
                            bg-[#FAFAF9]
                            dark:border-white/[0.06]
                            dark:bg-[#202023]
                        "
                    >
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold text-[#111827] dark:text-[#F4F4F5]">
                                Booking ID
                            </th>

                            <th className="px-6 py-4 text-left font-semibold text-[#111827] dark:text-[#F4F4F5]">
                                Service
                            </th>

                            <th className="px-6 py-4 text-left font-semibold text-[#111827] dark:text-[#F4F4F5]">
                                Provider
                            </th>

                            <th className="px-6 py-4 text-left font-semibold text-[#111827] dark:text-[#F4F4F5]">
                                Date
                            </th>

                            <th className="px-6 py-4 text-left font-semibold text-[#111827] dark:text-[#F4F4F5]">
                                Price
                            </th>

                            <th className="px-6 py-4 text-left font-semibold text-[#111827] dark:text-[#F4F4F5]">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr
                                key={booking.id}
                                className="
                                    border-b border-black/[0.06]
                                    last:border-b-0
                                    hover:bg-[#FAFAF9]
                                    dark:border-white/[0.06]
                                    dark:hover:bg-[#202023]
                                "
                            >
                                <td className="px-6 py-4 font-medium text-[#15803D] dark:text-[#22C55E]">
                                    {booking.id}
                                </td>

                                <td className="px-6 py-4 font-medium text-[#111827] dark:text-[#F4F4F5]">
                                    {booking.serviceName}
                                </td>

                                <td className="px-6 py-4 text-[#6B7280] dark:text-[#A1A1AA]">
                                    {booking.providerName}
                                </td>

                                <td className="px-6 py-4 text-[#6B7280] dark:text-[#A1A1AA]">
                                    {booking.date}
                                </td>

                                <td className="px-6 py-4 font-medium text-[#111827] dark:text-[#F4F4F5]">
                                    ৳{booking.price.toLocaleString()}
                                </td>

                                <td className="px-6 py-4">
                                    <Chip
                                        size="sm"
                                        variant="soft"
                                        color={
                                            booking.status === "Completed"
                                                ? "success"
                                                : "danger"
                                        }
                                    >
                                        {booking.status}
                                    </Chip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingHistoryTable;