"use client";

import {
  FiBriefcase,
  FiCheckCircle,
  FiPlusCircle,
  FiPauseCircle,
} from "react-icons/fi";
import type { ProviderService } from "@/types/index";

interface MyServicesHeaderProps {
  services: ProviderService[];
  onAddNew: () => void;
}

const MyServicesHeader = ({ services, onAddNew }: MyServicesHeaderProps) => {
  const total = services.length;
  const active = services.filter((s) => s.status === "active").length;
  const inactive = total - active;

  const stats = [
    { title: "Total Services", value: total, icon: FiBriefcase },
    { title: "Active", value: active, icon: FiCheckCircle },
    { title: "Inactive", value: inactive, icon: FiPauseCircle },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-[#15803D] dark:text-[#22C55E]">
            Provider Dashboard
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB] sm:text-4xl">
            My Services
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#4B5563] dark:text-[#A1A1AA]">
            Create, update, and manage the services you offer on HandyHub.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddNew}
          className="group inline-flex w-fit items-center gap-2 rounded-xl bg-[#15803D] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#166534] dark:bg-[#22C55E] dark:text-[#151618] dark:hover:bg-[#16A34A]"
        >
          <FiPlusCircle size={16} />
          Add New Service
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-[#1D1D1F] dark:shadow-[0_10px_35px_rgba(0,0,0,0.22)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#15803D]/[0.08] text-[#15803D] ring-1 ring-[#15803D]/10 dark:bg-[#22C55E]/[0.08] dark:text-[#22C55E] dark:ring-[#22C55E]/10">
                  <Icon size={20} />
                </div>
                <span className="text-2xl font-bold text-[#111827] dark:text-[#F9FAFB]">
                  {stat.value}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                {stat.title}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyServicesHeader;
