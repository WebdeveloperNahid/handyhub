"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { getServiceById } from "@/lib/General_API";
import type { ProviderService } from "@/types/index";

import ServiceDetailHeader from "./ServiceDetailHeader";
import ServiceFeatures from "./ServiceFeatures";
import ServiceIncluded from "./ServiceIncluded";
import BookingSidebar from "./BookingSidebar";

const ServiceDetail = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = use(params);

    const [service, setService] = useState<ProviderService | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await getServiceById(id);

                if (res?.error) {
                    setService(null);
                    return;
                }

                setService(res?.data || res);
            } catch (error) {
                console.error("Failed to fetch service:", error);
                setService(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#FAF9F7] px-4 py-10 dark:bg-[#18181B]">
                <div className="mx-auto max-w-6xl">
                    <div className="h-5 w-32 animate-pulse rounded bg-[#15803D]/10 dark:bg-[#22C55E]/10" />

                    <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
                        <div>
                            <div className="h-80 animate-pulse rounded-3xl bg-[#15803D]/10 dark:bg-[#22C55E]/10" />

                            <div className="mt-6 h-10 w-3/4 animate-pulse rounded bg-[#15803D]/10 dark:bg-[#22C55E]/10" />

                            <div className="mt-4 h-20 animate-pulse rounded bg-[#15803D]/10 dark:bg-[#22C55E]/10" />
                        </div>

                        <div className="h-96 animate-pulse rounded-3xl bg-[#15803D]/10 dark:bg-[#22C55E]/10" />
                    </div>
                </div>
            </main>
        );
    }

    if (!service) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#FAF9F7] px-4 dark:bg-[#18181B]">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                        Service Not Found
                    </h2>

                    <p className="mt-2 text-sm text-[#6B7280] dark:text-[#A1A1AA]">
                        This service is no longer available.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#FAF9F7] text-[#1C1917] transition-colors duration-300 dark:bg-[#18181B] dark:text-[#F4F4F5]">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">

                {/* Back */}
                <Link
                    href="/all-services"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#15803D] transition-colors hover:text-[#166534] dark:text-[#22C55E] dark:hover:text-[#4ADE80]"
                >
                    <FiArrowLeft size={16} />
                    Back to services
                </Link>

                {/* Main Layout */}
                <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.65fr]">

                    {/* Left Content */}
                    <div className="min-w-0">
                        <ServiceDetailHeader service={service} />
                        <ServiceFeatures service={service} />
                        <ServiceIncluded />
                    </div>

                    {/* Right Booking */}
                    <div className="h-full min-h-full">
                        <div className="sticky top-24 self-start">
                            <BookingSidebar service={service} />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default ServiceDetail;