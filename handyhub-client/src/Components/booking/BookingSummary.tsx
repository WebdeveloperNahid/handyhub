interface Booking {
  status?: string;
}

interface BookingSummaryProps {
  bookings: Booking[];
}

export default function BookingSummary({
  bookings,
}: BookingSummaryProps) {
  const pending = bookings.filter(
    (booking) =>
      booking.status?.toLowerCase() === "pending",
  ).length;

  const inProgress = bookings.filter(
    (booking) =>
      booking.status?.toLowerCase() === "accepted" ||
      booking.status?.toLowerCase() === "in-progress",
  ).length;

  const completed = bookings.filter(
    (booking) =>
      booking.status?.toLowerCase() === "completed",
  ).length;

  const cards = [
    {
      label: "Total Bookings",
      value: bookings.length,
    },
    {
      label: "Pending",
      value: pending,
      className:
        "text-yellow-600 dark:text-yellow-400",
    },
    {
      label: "In Progress",
      value: inProgress,
      className:
        "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Completed",
      value: completed,
      className:
        "text-[#15803D] dark:text-[#22C55E]",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#27272A]"
        >
          <p className="text-xs font-medium text-[#6B7280] dark:text-[#A1A1AA]">
            {card.label}
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              card.className || ""
            }`}
          >
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}