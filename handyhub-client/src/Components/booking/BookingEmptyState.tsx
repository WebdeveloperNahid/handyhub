import { FiCalendar } from "react-icons/fi";

export default function BookingEmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-black/15 bg-white px-6 py-16 text-center dark:border-white/15 dark:bg-[#27272A]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
        <FiCalendar size={28} />
      </div>

      <h2 className="mt-5 text-xl font-bold">
        No bookings yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280] dark:text-[#A1A1AA]">
        You have not booked any services yet. Browse available
        services and make your first booking.
      </p>
    </div>
  );
}