"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

import {
  getMyBookings,
  cancelBooking,
} from "@/lib/booking_API";

import BookingSummary from "./BookingSummary";
import BookingCard, {
  Booking,
} from "./BookingCard";
import BookingEmptyState from "./BookingEmptyState";

import ReviewModal from "@/Components/booking/ReviewModal";
import DeleteModal from "@/Components/modals/DeleteModal";

export default function MyBookings() {
  const { data: session, isPending: sessionLoading } = useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Fetch bookings & keep only the ACTIVE ones here
  // (completed / cancelled / rejected -> Booking History page)
  useEffect(() => {
    if (sessionLoading) return;

    if (!session?.session?.token) {
      setIsLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getMyBookings(session.session.token);
        const rawData = response?.data || [];

        // Active bookings filter (completed/cancelled/rejected History page e jabe)
        const activeBookings = rawData.filter(
          (item: Booking) =>
            item.status !== "cancelled" &&
            item.status !== "completed" &&
            item.status !== "rejected"
        );

        setBookings(activeBookings);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load bookings."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [session, sessionLoading]);

  const handleReviewSubmit = (reviewData: {
    rating: number;
    comment: string;
    bookingId: string;
  }) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === reviewData.bookingId
          ? { ...booking, isReviewed: true }
          : booking
      )
    );

    setSelectedBooking(null);
  };

  // Fixed handleCancelBooking function
  const handleCancelBooking = async () => {
    if (!bookingToCancel || !session?.session?.token) {
      return;
    }

    const idToRemove = bookingToCancel;

    try {
      setIsCancelling(true);
      setError("");

      // 1. API Request to Cancel
      await cancelBooking(idToRemove, session.session.token);

      // 2. Cancel howa booking ke list theke bad dao (Booking History te dekha jabe)
      setBookings((prev) =>
        prev.filter((booking) => String(booking._id) !== String(idToRemove))
      );

      setBookingToCancel(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to cancel booking."
      );
    } finally {
      setIsCancelling(false);
    }
  };

  if (sessionLoading || isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF9F7] px-4 py-10 dark:bg-[#18181B] sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 space-y-3">
            <div className="h-3 w-32 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
            <div className="h-10 w-64 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
            <div className="h-4 w-96 max-w-full animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
          </div>

          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-60 animate-pulse rounded-3xl bg-white dark:bg-[#27272A]"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!session?.session?.token) {
    return (
      <main className="min-h-screen bg-[#FAF9F7] px-4 py-14 dark:bg-[#18181B] sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-xl font-bold">Please sign in</h2>
          <p className="mt-2 text-sm text-gray-500">
            Please sign in to view your bookings.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F7] px-4 py-10 text-[#1C1917] dark:bg-[#18181B] dark:text-[#F4F4F5] sm:px-6 lg:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-[#15803D] dark:bg-[#22C55E]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#15803D] dark:text-[#22C55E]">
              Customer Dashboard
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-[#6B7280] dark:text-[#A1A1AA]">
            Keep track of your service requests, schedules, providers, and booking progress.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Summary */}
        {bookings.length > 0 && <BookingSummary bookings={bookings} />}

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="space-y-5">
            {bookings.map((booking, index) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                index={index}
                onReview={setSelectedBooking}
                onCancel={(id) => setBookingToCancel(id)}
              />
            ))}
          </div>
        ) : (
          <BookingEmptyState />
        )}

        {/* Review Modal */}
        {selectedBooking && (
          <ReviewModal
            isOpen={!!selectedBooking}
            onClose={() => setSelectedBooking(null)}
            serviceTitle={selectedBooking.serviceTitle}
            bookingId={selectedBooking._id}
            onSubmit={handleReviewSubmit}
          />
        )}

        {/* Cancel Modal */}
        <DeleteModal
          isOpen={!!bookingToCancel}
          onClose={() => setBookingToCancel(null)}
          onConfirm={handleCancelBooking}
          title="Cancel Booking"
          description="Are you sure you want to cancel this booking request?"
        />

        {/* Cancelling Spinner Overlay */}
        {isCancelling && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="rounded-2xl bg-white px-6 py-5 shadow-xl dark:bg-[#27272A]">
              <p className="text-sm font-medium">Cancelling booking...</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}