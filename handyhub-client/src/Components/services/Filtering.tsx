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
            <div className="rounded-2xl border border-[#6E473B]/15 bg-[#E8DDCE] p-4 dark:border-white/10 dark:bg-[#241B17] sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row">
                    {/* Search */}
                    <div className="relative flex-1">
                        <FiSearch
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E473B]/60 dark:text-[#A78D78]"
                        />

                        <input
                            type="text"
                            placeholder="Search services..."
                            className="h-12 w-full rounded-xl border border-[#6E473B]/15 bg-[#E1D4C2] pl-11 pr-4 text-sm text-[#291C0E] outline-none transition-all placeholder:text-[#6E473B]/50 focus:border-[#A78D78] dark:border-white/10 dark:bg-[#1F1712] dark:text-[#E1D4C2] dark:placeholder:text-[#A78D78]/60"
                        />
                    </div>

                    {/* Category */}
                    <div className="relative lg:w-52">
                        <FiSliders
                            size={16}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6E473B] dark:text-[#A78D78]"
                        />

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            className="h-12 w-full appearance-none rounded-xl border border-[#6E473B]/15 bg-[#E1D4C2] pl-10 pr-10 text-sm font-medium text-[#291C0E] outline-none focus:border-[#A78D78] dark:border-white/10 dark:bg-[#1F1712] dark:text-[#E1D4C2]"
                        >
                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <FiChevronDown
                            size={16}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6E473B] dark:text-[#A78D78]"
                        />
                    </div>

                    {/* Sort */}
                    <div className="relative lg:w-44">
                        <select
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value)
                            }
                            className="h-12 w-full appearance-none rounded-xl border border-[#6E473B]/15 bg-[#E1D4C2] px-4 pr-10 text-sm font-medium text-[#291C0E] outline-none focus:border-[#A78D78] dark:border-white/10 dark:bg-[#1F1712] dark:text-[#E1D4C2]"
                        >
                            <option>Popular</option>
                            <option>Top Rated</option>
                            <option>Newest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>

                        <FiChevronDown
                            size={16}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6E473B] dark:text-[#A78D78]"
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
                                    ? "bg-[#291C0E] text-[#E1D4C2] dark:bg-[#A78D78] dark:text-[#291C0E]"
                                    : "bg-[#E1D4C2] text-[#6E473B] hover:bg-[#6E473B] hover:text-[#E1D4C2] dark:bg-[#1F1712] dark:text-[#BEB5A9] dark:hover:bg-[#6E473B] dark:hover:text-[#E1D4C2]"
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