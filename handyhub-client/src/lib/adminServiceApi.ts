// import { ApiResponse, IService, UpdateServicePayload } from "@/types/service";

import { IService, UpdateServicePayload } from "@/app/(dashboard)/dashboard/admin/manage-services/page";
import { ApiResponse } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;

  // 1. Scan localStorage for any auth/token/session key
  const storageKeys = ["token", "admin_token", "accessToken", "bearer_token", "better-auth.session_token", "session_token"];
  for (const key of storageKeys) {
    const val = localStorage.getItem(key);
    if (val) return val.trim().replace(/^"|"$/g, "");
  }

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.toLowerCase().includes("token") || key.toLowerCase().includes("session"))) {
      const val = localStorage.getItem(key);
      if (val && val.length > 10) return val.trim().replace(/^"|"$/g, "");
    }
  }

  // 2. Scan cookies for any token/session cookie
  if (document.cookie) {
    const cookies = document.cookie.split(";");
    for (const c of cookies) {
      const [rawName, rawVal] = c.trim().split("=");
      if (!rawName || !rawVal) continue;
      const name = rawName.trim().toLowerCase();
      if (name.includes("token") || name.includes("session") || name.includes("auth")) {
        return decodeURIComponent(rawVal.trim()).replace(/^"|"$/g, "");
      }
    }
  }

  return null;
};

const req = async <T>(path: string, opts: RequestInit = {}): Promise<ApiResponse<T>> => {
  const token = getAuthToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}` } : {}),
      ...opts.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed (${res.status})`);
  }

  return res.json();
};

export const adminServiceApi = {
  getAllServices: () => req<IService[]>("/api/v1/admin/services"),
  getServiceById: (id: string) => req<IService>(`/api/v1/admin/services/${id}`),
  updateService: (id: string, payload: UpdateServicePayload) =>
    req<{ acknowledged: boolean; modifiedCount: number; matchedCount: number }>(`/api/v1/admin/services/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  deleteService: (id: string) =>
    req<{ acknowledged: boolean; deletedCount: number }>(`/api/v1/admin/services/${id}`, {
      method: "DELETE",
    }),
};
