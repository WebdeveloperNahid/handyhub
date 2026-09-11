"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiClock,
  FiDroplet,
  FiHome,
  FiMonitor,
  FiStar,
  FiTool,
  FiWind,
  FiZap,
} from "react-icons/fi";

type Service = {
  id: string | number;
  title: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  icon?: string;
};

type ServiceCardProps = {
  services: Service[];
};

const iconMap = {
  plumbing: FiDroplet,
  electrical: FiZap,
  cleaning: FiWind,
  painting: FiHome,
  repair: FiTool,
  appliance: FiMonitor,
};

const ServiceCard = ({ services }: ServiceCardProps) => {
  return (
    <section>
      {services.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon =
              iconMap[service.icon as keyof typeof iconMap] || FiTool;

            return (
              <motion.article
                key={service.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#FAF9F7] transition-all duration-300 hover:border-[#15803D]/40 hover:shadow-xl dark:border-white/10 dark:bg-[#18181B] dark:hover:border-[#22C55E]/40"
              >
                {/* Card visual header */}
                <div className="relative flex h-40 items-center justify-center bg-[#18181B] dark:bg-[#27272A]">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/10" />

                  <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full border border-white/5" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#15803D] text-white shadow-lg transition-transform duration-300 group-hover:scale-105 dark:bg-[#22C55E] dark:text-[#18181B]">
                    <Icon size={28} strokeWidth={1.6} />
                  </div>

                  <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                    {service.category}
                  </span>
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-[#1C1917] dark:text-[#F4F4F5]">
                      {service.title}
                    </h3>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] transition-all group-hover:bg-[#15803D] group-hover:text-white dark:bg-[#22C55E]/10 dark:text-[#22C55E] dark:group-hover:bg-[#22C55E] dark:group-hover:text-[#18181B]">
                      <FiArrowUpRight size={16} />
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#1C1917]/70 dark:text-[#A1A1AA]">
                    {service.description}
                  </p>

                  {/* Rating */}
                  <div className="mt-5 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[#F59E0B] dark:text-[#FBBF24]">
                      <FiStar size={14} className="fill-current" />

                      <span className="text-sm font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                        {service.rating}
                      </span>
                    </div>

                    <span className="text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/70">
                      ({service.reviews} reviews)
                    </span>
                  </div>

                  {/* Price + Duration */}
                  <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4 dark:border-white/10">
                    <div>
                      <p className="text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/70">
                        Starting at
                      </p>

                      <p className="mt-0.5 text-base font-bold text-[#15803D] dark:text-[#22C55E]">
                        ৳{service.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#1C1917]/70 dark:text-[#A1A1AA]">
                      <FiClock size={13} />
                      {service.duration}
                    </div>
                  </div>

                  {/* Button */}
                  <Link
                    href={`/all-services/${service.id}`}
                    className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#15803D] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#15803D]/90 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#22C55E]/90"
                  >
                    View service
                    <FiArrowUpRight size={15} />
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

          <p className="mt-2 text-sm text-[#1C1917]/70 dark:text-[#A1A1AA]">
            Try another category or search term.
          </p>
        </div>
      )}
    </section>
  );
};

export default ServiceCard;
