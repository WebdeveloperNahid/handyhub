export default function Loading() {
  return (
    <main className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-white dark:bg-[#18181B]">
      <div className="flex flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <div className="relative">
          {/* Soft glow */}
          <div className="absolute inset-0 scale-150 rounded-2xl bg-[#15803D]/10 blur-2xl dark:bg-[#22C55E]/10" />

          {/* Logo box */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#15803D] text-white shadow-lg shadow-[#15803D]/20 dark:bg-[#22C55E] dark:text-[#18181B]">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-[pulse_1.8s_ease-in-out_infinite]"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
        </div>

        {/* Brand */}
        <h1 className="mt-5 text-xl font-bold tracking-tight text-[#1C1917] dark:text-[#F4F4F5] sm:text-2xl">
          HandyHub
        </h1>

        <p className="mt-1 text-xs text-[#78716C] dark:text-[#A1A1AA] sm:text-sm">
          Connecting you with trusted services
        </p>

        {/* Loading indicator */}
        <div className="mt-6 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#15803D] [animation-delay:-0.3s] dark:bg-[#22C55E]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#15803D] [animation-delay:-0.15s] dark:bg-[#22C55E]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#15803D] dark:bg-[#22C55E]" />
        </div>
      </div>
    </main>
  );
}