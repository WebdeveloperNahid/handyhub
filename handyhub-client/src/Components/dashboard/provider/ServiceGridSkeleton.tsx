const ServiceGridSkeleton = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-black/[0.08] bg-white dark:border-white/[0.08] dark:bg-[#1D1D1F]"
        >
          <div className="h-28 bg-black/[0.06] dark:bg-white/[0.06]" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-2/3 rounded bg-black/[0.08] dark:bg-white/[0.08]" />
            <div className="h-3 w-full rounded bg-black/[0.06] dark:bg-white/[0.06]" />
            <div className="h-3 w-4/5 rounded bg-black/[0.06] dark:bg-white/[0.06]" />
            <div className="mt-4 flex gap-2">
              <div className="h-9 flex-1 rounded-xl bg-black/[0.06] dark:bg-white/[0.06]" />
              <div className="h-9 flex-1 rounded-xl bg-black/[0.06] dark:bg-white/[0.06]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceGridSkeleton;
