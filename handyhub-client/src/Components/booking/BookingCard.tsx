import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiStar,
  FiRefreshCw,
  FiTrash2,
  FiMapPin,
  FiUser,
} from "react-icons/fi";

export type BookingStatus =
  | "pending"
  | "accepted"
  | "in progress"
  | "completed"
  | "cancelled";

export interface Booking {
  _id: string;
  serviceId: string;
  serviceTitle: string;
  providerName: string;
  category?: string;
  bookingDate: string;
  bookingTime: string;
  address?: string;
  price: number;
  status?: BookingStatus;
  isReviewed?: boolean;
}

interface BookingCardProps {
  booking: Booking;
  index: number;
  onReview: (booking: Booking) => void;
  onCancel: (bookingId: string) => void;
}

export default function BookingCard({
  booking,
  index,
  onReview,
  onCancel,
}: BookingCardProps) {
  // Old bookings may not have a status
  const status = booking.status?.toLowerCase() || "pending";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";

      case "accepted":
        return "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400";

      case "in progress":
        return "border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400";

      case "completed":
        return "border-[#15803D]/20 bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]";

      case "cancelled":
        return "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400";

      default:
        return "border-gray-500/20 bg-gray-500/10 text-gray-600";
    }
  };

  const formatStatus = (status: string) =>
    status
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join(" ");

  const formatDate = (date: string) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-[#27272A]"
    >
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] dark:text-[#22C55E]">
                Booking
              </span>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadge(
                  status,
                )}`}
              >
                {formatStatus(status)}
              </span>
            </div>

            <h2 className="text-xl font-bold sm:text-2xl">
              {booking.serviceTitle}
            </h2>

            {booking.category && (
              <p className="mt-1 text-sm text-[#6B7280] dark:text-[#A1A1AA]">
                {booking.category}
              </p>
            )}
          </div>

          <div className="sm:text-right">
            <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">
              Service Price
            </p>

            <p className="mt-1 text-2xl font-bold">
              ৳{booking.price}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 grid gap-4 border-t border-black/10 pt-5 dark:border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          <Detail
            icon={<FiUser size={17} />}
            label="Provider"
            value={booking.providerName}
          />

          <Detail
            icon={<FiCalendar size={17} />}
            label="Date"
            value={formatDate(booking.bookingDate)}
          />

          <Detail
            icon={<FiClock size={17} />}
            label="Time"
            value={booking.bookingTime}
          />

          {booking.address && (
            <Detail
              icon={<FiMapPin size={17} />}
              label="Address"
              value={booking.address}
            />
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-black/10 pt-5 dark:border-white/10">
          {status === "pending" && (
            <>
              <span className="mr-auto inline-flex items-center gap-2 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                <FiRefreshCw
                  size={14}
                  className="animate-spin"
                />
                Awaiting provider confirmation
              </span>

              <button
                onClick={() => onCancel(booking._id)}
                className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <FiTrash2 size={15} />
                Cancel Booking
              </button>
            </>
          )}

          {status === "accepted" && (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <FiCheckCircle size={15} />
              Booking Confirmed
            </span>
          )}

          {status === "in progress" && (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
              <FiRefreshCw size={15} />
              Service in progress
            </span>
          )}

          {status === "completed" &&
            (booking.isReviewed ? (
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#15803D] dark:text-[#22C55E]">
                <FiCheckCircle size={15} />
                Reviewed
              </span>
            ) : (
              <button
                onClick={() => onReview(booking)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#116b32] dark:bg-[#22C55E] dark:text-[#18181B]"
              >
                <FiStar size={15} />
                Review Service
              </button>
            ))}

          {status === "cancelled" && (
            <span className="text-xs font-medium text-red-600 dark:text-red-400">
              This booking has been cancelled.
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-xl bg-[#15803D]/10 p-2.5 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
        {icon}
      </div>

      <div>
        <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">
          {label}
        </p>

        <p className="mt-1 line-clamp-2 text-sm font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}