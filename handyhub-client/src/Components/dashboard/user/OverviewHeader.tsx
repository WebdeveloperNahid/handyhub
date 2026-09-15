import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const OverviewHeader = () => {
  return (
    <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-medium text-[#15803D] dark:text-[#22C55E]">
          Customer Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB] sm:text-4xl">
          Welcome back!
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#4B5563] dark:text-[#A1A1AA]">
          Keep track of your service requests, saved providers, and recent
          activities from one place.
        </p>
      </div>

      <Link
        href="/all-services"
        className="
          group inline-flex w-fit items-center gap-2 rounded-xl
          bg-[#15803D] px-4 py-2.5
          text-sm font-semibold text-white
          transition-all duration-300
          hover:bg-[#166534]
          dark:bg-[#22C55E] dark:text-[#151618]
          dark:hover:bg-[#16A34A]
        "
      >
        Find a Service

        <FiArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </section>
  );
};

export default OverviewHeader;