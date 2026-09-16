import Link from "next/link";
import {
  FiSearch,
  FiClipboard,
  FiHeart,
} from "react-icons/fi";

const actions = [
  {
    title: "Browse Services",
    description: "Find the right professional",
    href: "/all-services",
    icon: FiSearch,
  },
  {
    title: "My Requests",
    description: "Track your service requests",
    href: "/dashboard/user/my-requests",
    icon: FiClipboard,
  },
  {
    title: "Saved Providers",
    description: "View your favorite providers",
    href: "/dashboard/user/saved-providers",
    icon: FiHeart,
  },
];

const QuickActions = () => {
  return (
    <section
      className="
        rounded-2xl
        border border-black/[0.08]
        bg-white p-5
        dark:border-white/[0.08]
        dark:bg-[#1D1D1F]
      "
    >
      <h2 className="font-semibold text-[#18181B] dark:text-[#F4F4F5]">
        Quick Actions
      </h2>

      <p className="mt-1 text-xs text-[#4B5563] dark:text-[#A1A1AA]">
        Common things you may want to do
      </p>

      <div className="mt-5 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="
                group flex items-center gap-4 rounded-xl
                border border-black/[0.06]
                p-3.5
                transition-all duration-300
                hover:border-[#15803D]/30
                hover:bg-[#FAFAF9]
                dark:border-white/[0.06]
                dark:hover:border-[#22C55E]/20
                dark:hover:bg-[#202123]
              "
            >
              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-[#15803D]/[0.08]
                  text-[#15803D]
                  ring-1 ring-[#15803D]/10
                  transition-all duration-300
                  group-hover:scale-105
                  group-hover:bg-[#15803D]
                  group-hover:text-white
                  dark:bg-[#22C55E]/[0.08]
                  dark:text-[#22C55E]
                  dark:ring-[#22C55E]/10
                  dark:group-hover:bg-[#22C55E]
                  dark:group-hover:text-[#151618]
                "
              >
                <Icon size={18} />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                  {action.title}
                </h3>

                <p className="mt-0.5 text-xs text-[#4B5563] dark:text-[#A1A1AA]">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;