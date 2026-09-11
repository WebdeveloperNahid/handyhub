"use client";

import { useState } from "react";
import { FiTruck, FiZap, FiCalendar } from "react-icons/fi";

const options = [
  {
    id: "standard",
    title: "Standard Delivery",
    desc: "Delivered in 2-3 Days",
    price: "Free",
    icon: FiTruck,
  },
  {
    id: "express",
    title: "Express / Immediate",
    desc: "Within 24 hours",
    price: "৳150",
    icon: FiZap,
  },
  {
    id: "schedule",
    title: "Scheduled Slot",
    desc: "Pick your date & time",
    price: "৳50",
    icon: FiCalendar,
  },
];

export default function DeliveryMethod() {
  const [selected, setSelected] = useState("standard");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-[#1C1917] dark:text-[#F4F4F5]">
        Select Delivery / Slot
      </h3>
      <div className="space-y-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${
                isSelected
                  ? "border-[#15803D] bg-[#15803D]/5 shadow-sm dark:border-[#22C55E] dark:bg-[#22C55E]/10"
                  : "border-black/10 bg-white hover:border-black/20 dark:border-white/10 dark:bg-[#27272A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-xl p-2.5 ${
                    isSelected
                      ? "bg-[#15803D] text-white dark:bg-[#22C55E] dark:text-[#18181B]"
                      : "bg-black/5 text-[#1C1917]/70 dark:bg-white/5 dark:text-[#A1A1AA]"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                    {opt.title}
                  </p>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    {opt.desc}
                  </p>
                </div>
              </div>

              <span className="text-sm font-semibold text-[#15803D] dark:text-[#22C55E]">
                {opt.price}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
