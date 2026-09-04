"use client";

import { useState } from "react";
import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

const Paginations = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = 5;

    return (
        <div className="mt-10 flex items-center justify-center gap-2">
            {/* Previous */}
            <button
                disabled={currentPage === 1}
                onClick={() =>
                    setCurrentPage((prev) =>
                        Math.max(prev - 1, 1)
                    )
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#6E473B]/15 text-[#6E473B] transition-all hover:border-[#A78D78] hover:bg-[#6E473B] hover:text-[#E1D4C2] disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/10 dark:text-[#BEB5A9] dark:hover:bg-[#6E473B]"
            >
                <FiChevronLeft size={17} />
            </button>

            {/* Pages */}
            {Array.from(
                { length: totalPages },
                (_, index) => index + 1
            ).map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition-all ${
                        currentPage === page
                            ? "bg-[#291C0E] text-[#E1D4C2] dark:bg-[#A78D78] dark:text-[#291C0E]"
                            : "border border-[#6E473B]/15 text-[#6E473B] hover:border-[#A78D78] hover:bg-[#6E473B] hover:text-[#E1D4C2] dark:border-white/10 dark:text-[#BEB5A9] dark:hover:bg-[#6E473B]"
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Next */}
            <button
                disabled={currentPage === totalPages}
                onClick={() =>
                    setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages)
                    )
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#6E473B]/15 text-[#6E473B] transition-all hover:border-[#A78D78] hover:bg-[#6E473B] hover:text-[#E1D4C2] disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/10 dark:text-[#BEB5A9] dark:hover:bg-[#6E473B]"
            >
                <FiChevronRight size={17} />
            </button>
        </div>
    );
};

export default Paginations;