"use client";

import { useEffect, useState, useMemo } from "react";
import Filtering from "@/Components/services/Filtering";
import Paginations from "@/Components/services/Paginations";
import ServiceCard from "@/Components/services/ServiceCard";
import { getAllServices } from "@/lib/General_API";
import type { ProviderService } from "@/types/index";

const ITEMS_PER_PAGE = 6;

export default function AllServicesPage() {
  const [services, setServices] = useState<ProviderService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;
    getAllServices()
      .then((res) => {
        if (!isMounted) return;
        const data = res?.data || (Array.isArray(res) ? res : []);
        // Extra safeguard: only show active services
        const activeServices = data.filter(
          (service: ProviderService) => service.status === "active"
        );
        setServices(activeServices);
        setIsLoading(false);
      })
      .catch(() => {
        if (isMounted) {
          setServices([]);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute pagination based on active services
  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE) || 1;
  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return services.slice(start, start + ITEMS_PER_PAGE);
  }, [services, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#FAF9F7] text-[#1C1917] transition-colors duration-300 dark:bg-[#18181B] dark:text-[#F4F4F5]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#15803D] dark:text-[#22C55E]">
            HandyHub
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Services
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#1C1917]/70 dark:text-[#A1A1AA] sm:text-base">
            Find trusted professionals for your everyday needs.
          </p>
        </div>

        {/* Filtering */}
        <Filtering />

        {/* Service Cards */}
        <ServiceCard services={paginatedServices} isLoading={isLoading} />

        {/* Dynamic Pagination */}
        <Paginations
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
