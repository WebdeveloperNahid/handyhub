export default function DashboardLoading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white dark:bg-[#18181B]">
      <div className="flex flex-col items-center">
        {/* Logo Loader */}
        <div className="relative">
          <div className="absolute inset-0 scale-150 rounded-2xl bg-[#15803D]/10 blur-xl dark:bg-[#22C55E]/10" />

          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#15803D] text-white shadow-md dark:bg-[#22C55E] dark:text-[#18181B]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
        </div>

        <p className="mt-4 text-sm font-medium text-[#57534E] dark:text-[#A1A1AA]">
          Loading...
        </p>

        {/* Dots */}
        <div className="mt-3 flex gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#15803D] [animation-delay:-0.3s] dark:bg-[#22C55E]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#15803D] [animation-delay:-0.15s] dark:bg-[#22C55E]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#15803D] dark:bg-[#22C55E]" />
        </div>
      </div>
    </div>
  );
}