import {
  FiClock,
  FiCheckCircle,
  FiHeart,
  FiClipboard,
} from "react-icons/fi";

const stats = [
  {
    title: "Active Requests",
    value: "03",
    icon: FiClipboard,
    description: "Currently in progress",
  },
  {
    title: "Completed Services",
    value: "12",
    icon: FiCheckCircle,
    description: "Services completed",
  },
  {
    title: "Saved Providers",
    value: "08",
    icon: FiHeart,
    description: "Providers you saved",
  },
  {
    title: "Pending Requests",
    value: "02",
    icon: FiClock,
    description: "Waiting for response",
  },
];

const OverviewStats = () => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              rounded-2xl
              border border-black/[0.08]
              bg-white p-5
              shadow-[0_8px_30px_rgba(0,0,0,0.04)]
              transition-all duration-300
              hover:-translate-y-1
              hover:border-[#15803D]/25
              hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
              dark:border-white/[0.08]
              dark:bg-[#1D1D1F]
              dark:shadow-[0_10px_35px_rgba(0,0,0,0.22)]
              dark:hover:border-[#22C55E]/20
            "
          >
            <div className="flex items-start justify-between">
              <div
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-xl
                  bg-[#15803D]/[0.08]
                  text-[#15803D]
                  ring-1 ring-[#15803D]/10
                  dark:bg-[#22C55E]/[0.08]
                  dark:text-[#22C55E]
                  dark:ring-[#22C55E]/10
                "
              >
                <Icon size={20} />
              </div>

              <span className="text-2xl font-bold text-[#111827] dark:text-[#F9FAFB]">
                {stat.value}
              </span>
            </div>

            <h3 className="mt-5 text-sm font-semibold text-[#18181B] dark:text-[#F4F4F5]">
              {stat.title}
            </h3>

            <p className="mt-1 text-xs text-[#4B5563] dark:text-[#A1A1AA]">
              {stat.description}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default OverviewStats;