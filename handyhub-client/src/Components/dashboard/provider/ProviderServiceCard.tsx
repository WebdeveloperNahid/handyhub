"use client";

import { motion } from "framer-motion";
import {
  FiClock,
  FiDroplet,
  FiEdit2,
  FiHome,
  FiMonitor,
  FiTool,
  FiTrash2,
  FiWind,
  FiZap,
} from "react-icons/fi";
import type { ProviderService } from "@/types/index";

interface ProviderServiceCardProps {
  service: ProviderService;
  index: number;
  onEdit: (service: ProviderService) => void;
  onDelete: (service: ProviderService) => void;
}

const iconMap: Record<string, typeof FiTool> = {
  plumbing: FiDroplet,
  electrical: FiZap,
  cleaning: FiWind,
  painting: FiHome,
  "home repair": FiTool,
  "appliance repair": FiMonitor,
};

const ProviderServiceCard = ({
  service,
  index,
  onEdit,
  onDelete,
}: ProviderServiceCardProps) => {
  const Icon = iconMap[service.category?.toLowerCase()] || FiTool;
  const isActive = service.status === "active";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#15803D]/25 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] dark:border-white/[0.08] dark:bg-[#1D1D1F] dark:hover:border-[#22C55E]/20"
    >
      {/* Visual header */}
      <div className="relative flex h-28 items-center justify-center bg-[#18181B] dark:bg-[#27272A]">
        {service.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover opacity-90"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#15803D] text-white shadow-lg dark:bg-[#22C55E] dark:text-[#18181B]">
            <Icon size={24} strokeWidth={1.6} />
          </div>
        )}

        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm ${
            isActive
              ? "bg-[#15803D]/90 text-white dark:bg-[#22C55E]/90 dark:text-[#151618]"
              : "bg-black/40 text-white"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>

        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
          {service.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-[#18181B] dark:text-[#F4F4F5]">
          {service.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#4B5563] dark:text-[#A1A1AA]">
          {service.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-black/[0.08] pt-4 dark:border-white/[0.08]">
          <div>
            <p className="text-[10px] text-[#4B5563] dark:text-[#A1A1AA]">
              Price
            </p>
            <p className="text-sm font-bold text-[#15803D] dark:text-[#22C55E]">
              ৳{service.price}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#4B5563] dark:text-[#A1A1AA]">
            <FiClock size={13} />
            {service.duration}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(service)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 py-2.5 text-xs font-semibold text-[#18181B] transition-colors hover:border-[#15803D]/40 hover:bg-[#15803D]/5 hover:text-[#15803D] dark:border-white/10 dark:text-[#F4F4F5] dark:hover:border-[#22C55E]/40 dark:hover:bg-[#22C55E]/10 dark:hover:text-[#22C55E]"
          >
            <FiEdit2 size={13} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(service)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/20 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
          >
            <FiTrash2 size={13} />
            Delete
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProviderServiceCard;
