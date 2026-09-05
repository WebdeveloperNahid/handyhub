"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Paginations = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 5;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 text-[#1C1917]/70 transition-all hover:border-[#22C55E] hover:bg-[#22C55E] hover:text-[#18181B] disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/10 dark:text-[#A1A1AA] dark:hover:bg-[#22C55E] dark:hover:text-[#18181B]"
      >
        <FiChevronLeft size={17} />
      </button>

      {/* Pages */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition-all ${
              currentPage === page
                ? "bg-[#15803D] text-[#FAF9F7] dark:bg-[#22C55E] dark:text-[#18181B]"
                : "border border-black/10 text-[#1C1917]/70 hover:border-[#22C55E] hover:bg-[#22C55E] hover:text-[#18181B] dark:border-white/10 dark:text-[#A1A1AA] dark:hover:bg-[#22C55E] dark:hover:text-[#18181B]"
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 text-[#1C1917]/70 transition-all hover:border-[#22C55E] hover:bg-[#22C55E] hover:text-[#18181B] disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/10 dark:text-[#A1A1AA] dark:hover:bg-[#22C55E] dark:hover:text-[#18181B]"
      >
        <FiChevronRight size={17} />
      </button>
    </div>
  );
};

export default Paginations;
