"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiStar,
  FiRefreshCw,
  FiTrash2,
} from "react-icons/fi";
import PaymentMethod from "@/Components/checkout/PaymentMethod";
import DeliveryMethod from "@/Components/checkout/DeliveryMethod";
import ReviewModal from "@/Components/booking/ReviewModal";
import DeleteModal from "@/Components/modals/DeleteModal"; // ✅ আপনার প্রজেক্ট পাথ অনুযায়ী ইমপোর্ট করা হয়েছে

// Booking Lifecycle Types
type BookingStatus =
  | "Pending"
  | "Accepted"
  | "In Progress"
  | "Completed"
  | "Cancelled";

interface Booking {
  id: string;
  serviceTitle: string;
  providerName: string;
  date: string;
  time: string;
  price: number;
  status: BookingStatus;
  isReviewed?: boolean;
}

const mockBookings: Booking[] = [
  {
    id: "BK-101",
    serviceTitle: "Professional Plumbing",
    providerName: "Rahim Ahmed",
    date: "2026-09-15",
    time: "10:00 AM",
    price: 500,
    status: "Completed",
    isReviewed: false,
  },
  {
    id: "BK-102",
    serviceTitle: "Electrical Repair",
    providerName: "Karim Chowdhury",
    date: "2026-09-18",
    time: "02:30 PM",
    price: 600,
    status: "In Progress",
  },
  {
    id: "BK-103",
    serviceTitle: "Home Cleaning",
    providerName: "Cleanify Team",
    date: "2026-09-20",
    time: "11:00 AM",
    price: 800,
    status: "Pending",
  },
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      case "Accepted":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "In Progress":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "Completed":
        return "bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E] border-[#15803D]/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    }
  };

  const handleReviewSubmit = (reviewData: {
    rating: number;
    comment: string;
    bookingId: string;
  }) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === reviewData.bookingId ? { ...b, isReviewed: true } : b,
      ),
    );
  };

  const handleCancelBooking = () => {
    if (!bookingToDelete) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingToDelete ? { ...b, status: "Cancelled" } : b,
      ),
    );
    setBookingToDelete(null);
  };

  return (
    <main className="min-h-screen bg-[#FAF9F7] px-4 py-12 text-[#1C1917] transition-colors duration-300 dark:bg-[#18181B] dark:text-[#F4F4F5] sm:px-6">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Bookings
          </h1>
          <p className="mt-2 text-sm text-[#1C1917]/70 dark:text-[#A1A1AA]">
            Track status, manage schedule, and review completed services.
          </p>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col justify-between gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-[#27272A] sm:flex-row sm:items-center"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase text-[#15803D] dark:text-[#22C55E]">
                    {booking.id}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusBadge(
                      booking.status,
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold">{booking.serviceTitle}</h3>
                <p className="text-sm text-[#1C1917]/70 dark:text-[#A1A1AA]">
                  Provider:{" "}
                  <span className="font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                    {booking.providerName}
                  </span>
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="text-[#15803D] dark:text-[#22C55E]" />{" "}
                    {booking.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiClock className="text-[#15803D] dark:text-[#22C55E]" />{" "}
                    {booking.time}
                  </span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between gap-6 border-t border-black/10 pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0 dark:border-white/10">
                <span className="text-2xl font-bold">৳{booking.price}</span>

                {booking.status === "Completed" &&
                  (booking.isReviewed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803D] dark:text-[#22C55E]">
                      <FiCheckCircle /> Reviewed
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#15803D]/90 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#22C55E]/90"
                    >
                      <FiStar /> Review
                    </button>
                  ))}

                {booking.status === "Pending" && (
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                      <FiRefreshCw className="animate-spin" /> Awaiting Provider
                    </span>
                    <button
                      onClick={() => setBookingToDelete(booking.id)}
                      className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                      title="Cancel Booking"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delivery & Payment Selection Sections */}
        <div className="grid gap-8 rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#27272A] md:grid-cols-2">
          <DeliveryMethod />
          <PaymentMethod />
        </div>

        {/* Modals */}
        {selectedBooking && (
          <ReviewModal
            isOpen={!!selectedBooking}
            onClose={() => setSelectedBooking(null)}
            serviceTitle={selectedBooking.serviceTitle}
            bookingId={selectedBooking.id}
            onSubmit={handleReviewSubmit}
          />
        )}

        <DeleteModal
          isOpen={!!bookingToDelete}
          onClose={() => setBookingToDelete(null)}
          onConfirm={handleCancelBooking}
          title="Cancel Booking"
          description="Are you sure you want to cancel this booking request?"
        />
      </div>
    </main>
  );
}
