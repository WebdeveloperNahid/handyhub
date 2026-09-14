"use client";

import { useState } from "react";
import {
  FiCreditCard,
  FiCheckCircle,
  FiDollarSign,
  FiSmartphone,
} from "react-icons/fi";

const paymentMethods = [
  {
    id: "bkash",
    name: "bKash",
    desc: "Pay instantly via bKash",
    badge: "Popular",
    icon: FiSmartphone,
  },
  {
    id: "nagad",
    name: "Nagad",
    desc: "Fast payment via Nagad Wallet",
    badge: "",
    icon: FiSmartphone,
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    desc: "Pay with Visa or MasterCard",
    badge: "",
    icon: FiCreditCard,
  },
  {
    id: "cod",
    name: "Cash on Service",
    desc: "Pay after completion",
    badge: "Safe",
    icon: FiDollarSign,
  },
];

export default function PaymentMethod({
  onSelect,
}: {
  onSelect?: (id: string) => void;
}) {
  const [selected, setSelected] = useState("bkash");

  const handleSelect = (id: string) => {
    setSelected(id);
    if (onSelect) onSelect(id);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-[#1C1917] dark:text-[#F4F4F5]">
        Select Payment Method
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {paymentMethods.map((method) => {
          const isSelected = selected === method.id;
          const Icon = method.icon;
          return (
            <div
              key={method.id}
              onClick={() => handleSelect(method.id)}
              className={`relative flex cursor-pointer items-start justify-between rounded-2xl border p-4 transition-all duration-300 ${
                isSelected
                  ? "border-[#15803D] bg-[#15803D]/5 shadow-sm dark:border-[#22C55E] dark:bg-[#22C55E]/10"
                  : "border-black/10 bg-white hover:border-black/20 dark:border-white/10 dark:bg-[#27272A] dark:hover:border-white/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-xl p-2.5 ${
                    isSelected
                      ? "bg-[#15803D] text-white dark:bg-[#22C55E] dark:text-[#18181B]"
                      : "bg-black/5 text-[#1C1917]/70 dark:bg-white/5 dark:text-[#A1A1AA]"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                      {method.name}
                    </p>
                    {method.badge && (
                      <span className="rounded-full bg-[#15803D]/10 px-2 py-0.5 text-[10px] font-semibold text-[#15803D] dark:bg-[#22C55E]/20 dark:text-[#22C55E]">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    {method.desc}
                  </p>
                </div>
              </div>

              {isSelected && (
                <FiCheckCircle className="text-lg text-[#15803D] dark:text-[#22C55E]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
