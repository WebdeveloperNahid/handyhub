"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowUpRight,
  FiClock,
  FiStar,
  FiTool,
} from "react-icons/fi";
import type { ProviderService } from "@/types/index";

type ServiceCardProps = {
  services: ProviderService[];
  isLoading?: boolean;
};

const DEFAULT_IMAGE ="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80";

const ServiceCard = ({ services, isLoading = false }: ServiceCardProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex h-96 flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#FAF9F7] p-4 dark:border-white/10 dark:bg-[#18181B]"
          >
            <div className="h-48 w-full animate-pulse rounded-xl bg-black/5 dark:bg-white/5" />
            <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-black/5 dark:bg-white/5" />
            <div className="mt-2 h-4 w-full animate-pulse rounded bg-black/5 dark:bg-white/5" />
            <div className="mt-auto h-10 w-full animate-pulse rounded-xl bg-black/5 dark:bg-white/5" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section>
      {services.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const serviceId = service._id || "";
            const imageUrl = service.image?.trim() || DEFAULT_IMAGE;

            return (
              <motion.article
                key={serviceId || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#FAF9F7] transition-all duration-300 hover:border-[#15803D]/40 hover:shadow-xl dark:border-white/10 dark:bg-[#18181B] dark:hover:border-[#22C55E]/40"
              >
                {/* Visual Header with Next.js Image */}
                <div className="relative h-48 w-full overflow-hidden bg-[#18181B] dark:bg-[#27272A]">
                  <Image
                    src={imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                    {service.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold tracking-tight text-[#1C1917] dark:text-[#F4F4F5]">
                    {service.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#1C1917]/70 dark:text-[#A1A1AA]">
                    {service.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[#F59E0B] dark:text-[#FBBF24]">
                      <FiStar size={14} className="fill-current" />
                      <span className="text-sm font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                        4.9
                      </span>
                    </div>
                    <span className="text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/70">
                      (Verified Provider)
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4 dark:border-white/10">
                    <div>
                      <p className="text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/70">
                        Starting at
                      </p>
                      <p className="mt-0.5 text-base font-bold text-[#15803D] dark:text-[#22C55E]">
                        ৳{Number(service.price).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
                      <FiClock size={13} />
                      {service.duration || "1–2 hrs"}
                    </div>
                  </div>

                  {/* Redirect to Details Page */}
                  <Link
                    href={`/all-services/${serviceId}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#15803D] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#15803D]/90 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#22C55E]/90"
                  >
                    View Details & Book
                    <FiArrowUpRight size={16} />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/20 py-20 text-center dark:border-white/20">
          <FiTool
            size={28}
            className="mx-auto text-[#15803D] dark:text-[#22C55E]"
          />
          <h3 className="mt-4 text-lg font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
            No services found
          </h3>
          <p className="mt-1 text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
            There are currently no active services listed.
          </p>
        </div>
      )}
    </section>
  );
};

export default ServiceCard;
