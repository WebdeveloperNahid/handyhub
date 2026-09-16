import { FiArrowUpRight, FiCalendar } from "react-icons/fi";
import Link from "next/link";

const requests = [
  {
    service: "Home Cleaning",
    provider: "CleanHome Services",
    date: "Sep 14, 2026",
    status: "In Progress",
  },
  {
    service: "Plumbing Repair",
    provider: "QuickFix Plumbing",
    date: "Sep 11, 2026",
    status: "Completed",
  },
  {
    service: "Electrical Repair",
    provider: "PowerCare Services",
    date: "Sep 08, 2026",
    status: "Pending",
  },
];

const RecentRequests = () => {
  return (
    <section
      className="
        overflow-hidden rounded-2xl
        border border-black/[0.08]
        bg-white
        dark:border-white/[0.08]
        dark:bg-[#1D1D1F]
      "
    >
      <div
        className="
          flex items-center justify-between
          border-b border-black/[0.08]
          p-5
          dark:border-white/[0.08]
        "
      >
        <div>
          <h2 className="font-semibold text-[#18181B] dark:text-[#F4F4F5]">
            Recent Requests
          </h2>

          <p className="mt-1 text-xs text-[#4B5563] dark:text-[#A1A1AA]">
            Your latest service activities
          </p>
        </div>

        <Link
          href="/dashboard/user/requests"
          className="
            text-xs font-semibold
            text-[#15803D]
            hover:underline
            dark:text-[#22C55E]
          "
        >
          View all
        </Link>
      </div>

      <div className="divide-y divide-black/[0.08] dark:divide-white/[0.08]">
        {requests.map((request) => (
          <div
            key={`${request.service}-${request.date}`}
            className="
              flex flex-col gap-4 p-5
              transition-colors duration-300
              hover:bg-[#FAFAF9]
              dark:hover:bg-[#202123]
              sm:flex-row sm:items-center
              sm:justify-between
            "
          >
            <div>
              <h3 className="text-sm font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                {request.service}
              </h3>

              <p className="mt-1 text-xs text-[#4B5563] dark:text-[#A1A1AA]">
                {request.provider}
              </p>

              <div className="mt-2 flex items-center gap-1.5 text-xs text-[#4B5563] dark:text-[#A1A1AA]">
                <FiCalendar
                  size={13}
                  className="text-[#15803D] dark:text-[#22C55E]"
                />

                {request.date}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
              <span
                className={`
                  rounded-full px-3 py-1 text-[11px] font-semibold
                  ${
                    request.status === "Completed"
                      ? "bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]"
                      : request.status === "In Progress"
                        ? "bg-[#15803D]/[0.08] text-[#15803D] dark:bg-[#22C55E]/[0.08] dark:text-[#22C55E]"
                        : "bg-black/[0.04] text-[#4B5563] dark:bg-white/[0.06] dark:text-[#A1A1AA]"
                  }
                `}
              >
                {request.status}
              </span>

              <button
                type="button"
                className="
                  text-[#15803D]
                  transition-transform duration-300
                  hover:translate-x-1
                  dark:text-[#22C55E]
                "
              >
                <FiArrowUpRight size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentRequests;