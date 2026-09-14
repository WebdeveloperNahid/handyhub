"use client";

import { useState } from "react";
import { FiChevronDown, FiSearch, FiSliders } from "react-icons/fi";

const categories = [
  "All Services",
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Painting",
  "Home Repair",
  "Appliance Repair",
];

const Filtering = () => {
  const [category, setCategory] = useState("All Services");
  const [sort, setSort] = useState("Popular");

  return (
    <section className="mb-8">
      <div className="rounded-2xl border border-black/10 bg-[#FAF9F7] p-4 shadow-sm dark:border-white/10 dark:bg-[#18181B] sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1C1917]/50 dark:text-[#A1A1AA]"
            />

            <input
              type="text"
              placeholder="Search services..."
              className="h-12 w-full rounded-xl border border-black/10 bg-white pl-11 pr-4 text-sm text-[#1C1917] outline-none transition-all placeholder:text-[#1C1917]/50 focus:border-[#15803D] dark:border-white/10 dark:bg-[#27272A] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/60 dark:focus:border-[#22C55E]"
            />
          </div>

          {/* Category */}
          <div className="relative lg:w-52">
            <FiSliders
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#1C1917]/70 dark:text-[#A1A1AA]"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-black/10 bg-white pl-10 pr-10 text-sm font-medium text-[#1C1917] outline-none transition-all focus:border-[#15803D] dark:border-white/10 dark:bg-[#27272A] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-white dark:bg-[#27272A]"
                >
                  {item}
                </option>
              ))}
            </select>

            <FiChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1C1917]/70 dark:text-[#A1A1AA]"
            />
          </div>

          {/* Sort */}
          <div className="relative lg:w-44">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-black/10 bg-white px-4 pr-10 text-sm font-medium text-[#1C1917] outline-none transition-all focus:border-[#15803D] dark:border-white/10 dark:bg-[#27272A] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
            >
              <option className="bg-white dark:bg-[#27272A]">Popular</option>
              <option className="bg-white dark:bg-[#27272A]">Top Rated</option>
              <option className="bg-white dark:bg-[#27272A]">Newest</option>
              <option className="bg-white dark:bg-[#27272A]">
                Price: Low to High
              </option>
              <option className="bg-white dark:bg-[#27272A]">
                Price: High to Low
              </option>
            </select>

            <FiChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1C1917]/70 dark:text-[#A1A1AA]"
            />
          </div>
        </div>

        {/* Category buttons */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                category === item
                  ? "bg-[#15803D] text-white dark:bg-[#22C55E] dark:text-[#18181B]"
                  : "bg-black/5 text-[#1C1917]/70 hover:bg-[#15803D]/10 hover:text-[#15803D] dark:bg-white/5 dark:text-[#A1A1AA] dark:hover:bg-[#22C55E]/10 dark:hover:text-[#22C55E]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Filtering;
