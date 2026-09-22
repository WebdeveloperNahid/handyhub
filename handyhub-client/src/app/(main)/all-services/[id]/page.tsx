"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiStar,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";

export default function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const serviceId = resolvedParams.id;

  // Mock service data (বাস্তব ক্ষেত্রে API থেকে আসবে)
  const service = {
    id: serviceId,
    title: "Professional Home Cleaning & Maintenance",
    category: "cleaning",
    description:
      "Get top-tier deep home cleaning services with verified professionals. We ensure total hygiene, eco-friendly chemical usage, and 100% satisfaction guaranteed.",
    price: 1500,
    rating: 4.8,
    reviews: 124,
    duration: "2-3 hours",
    providerName: "Cleanify Bangladesh",
  };

  const handleConfirmBooking = () => {
    const existingBookings = JSON.parse(
      localStorage.getItem("myBookings") || "[]",
    );

    const newBooking = {
      ...service,
      bookingId: `BK-${Date.now()}`,
      bookingDate: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: "Pending", // initial status
    };

    localStorage.setItem(
      "myBookings",
      JSON.stringify([newBooking, ...existingBookings]),
    );
    router.push("/dashboard/user/my-bookings");
  };

  return (
    <main className="min-h-screen bg-[#FAF9F7] px-4 py-10 text-[#1C1917] dark:bg-[#18181B] dark:text-[#F4F4F5]">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/all-services"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#15803D] dark:text-[#22C55E]"
        >
          <FiArrowLeft size={16} /> Back to All Services
        </Link>

        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#27272A]">
          <span className="rounded-full bg-[#15803D]/10 px-3 py-1 text-xs font-semibold text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
            {service.category.toUpperCase()}
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {service.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-[#1C1917]/70 dark:text-[#A1A1AA]">
            <div className="flex items-center gap-1.5">
              <FiUser className="text-[#15803D] dark:text-[#22C55E]" />
              <span>
                Provider: <strong>{service.providerName}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#F59E0B]">
              <FiStar className="fill-current" />
              <span>
                {service.rating} ({service.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiClock />
              <span>{service.duration}</span>
            </div>
          </div>

          <hr className="my-6 border-black/10 dark:border-white/10" />

          <div>
            <h3 className="text-lg font-semibold">Service Overview</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#1C1917]/80 dark:text-[#A1A1AA]">
              {service.description}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#FAF9F7] p-5 dark:bg-[#18181B]">
            <div>
              <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                Total Service Fee
              </p>
              <p className="text-2xl font-bold text-[#15803D] dark:text-[#22C55E]">
                ৳{service.price}
              </p>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="flex items-center gap-2 rounded-xl bg-[#15803D] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#15803D]/90 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#22C55E]/90"
            >
              <FiCalendar size={18} />
              Confirm & Book This Service
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
