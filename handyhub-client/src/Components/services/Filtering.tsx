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
      <div className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#202023] sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1C1917]/60 dark:text-[#FBBF24]"
            />

            <input
              type="text"
              placeholder="Search services..."
              className="h-12 w-full rounded-xl border border-black/10 bg-[#FAF9F7] pl-11 pr-4 text-sm text-[#1C1917] outline-none transition-all placeholder:text-[#1C1917]/50 focus:border-[#FBBF24] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/60"
            />
          </div>

          {/* Category */}
          <div className="relative lg:w-52">
            <FiSliders
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#F59E0B] dark:text-[#FBBF24]"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-black/10 bg-[#FAF9F7] pl-10 pr-10 text-sm font-medium text-[#1C1917] outline-none focus:border-[#FBBF24] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <FiChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#F59E0B] dark:text-[#FBBF24]"
            />
          </div>

          {/* Sort */}
          <div className="relative lg:w-44">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-black/10 bg-[#FAF9F7] px-4 pr-10 text-sm font-medium text-[#1C1917] outline-none focus:border-[#FBBF24] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5]"
            >
              <option>Popular</option>
              <option>Top Rated</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>

            <FiChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#F59E0B] dark:text-[#FBBF24]"
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
                  ? "bg-[#15803D] text-[#FAF9F7] dark:bg-[#22C55E] dark:text-[#18181B]"
                  : "bg-[#FAF9F7] text-[#1C1917]/70 hover:bg-[#15803D] hover:text-[#FAF9F7] dark:bg-[#18181B] dark:text-[#A1A1AA] dark:hover:bg-[#22C55E] dark:hover:text-[#18181B]"
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
