"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardRedirectPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      // লগইন না থাকলে সাইন-ইন পেজে নিয়ে যাবে
      if (!session?.user) {
        router.push("/signin");
        return;
      }

      const role = (session.user as { role?: string })?.role;

      // রোল অনুযায়ী রিডাইরেক্ট
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "provider") {
        router.push("/dashboard/provider");
      } else {
        router.push("/dashboard/user");
      }
    }
  }, [session, isPending, router]);

  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#15803D] border-t-transparent dark:border-[#22C55E]" />
    </div>
  );
}