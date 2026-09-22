"use server";

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export interface AdminStats {
  totalUsers: number;
  totalCustomers: number;
  totalProviders: number;
  totalAdmins: number;
  totalServices: number;
  activeServices: number;
  pendingServices: number;
  totalBookings: number;
  pendingBookings: number;
  activeBookings: number;
  completedBookings: number;
  totalRevenue: number;
}

export async function getAdminStats(): Promise<{ success?: boolean; data?: AdminStats; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/admin/stats`, {
      cache: "no-store",
    });

    if (!res.ok) return { error: "Failed to fetch admin stats" };
    return res.json();
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Network error" };
  }
}
