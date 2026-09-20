"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.SERVER_URL || "http://localhost:5000";

async function getHeaders(tokenOverride?: string): Promise<Record<string, string>> {
  let token = tokenOverride;

  if (!token) {
    try {
      const cookieStore = await cookies();
      token =
        cookieStore.get("better-auth.session_token")?.value ||
        cookieStore.get("__Secure-better-auth.session_token")?.value ||
        cookieStore.get("admin_token")?.value ||
        cookieStore.get("token")?.value;
    } catch {
      // Ignore outside request context
    }
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  }

  return headers;
}

export async function getAllServices(token?: string) {
  const headers = await getHeaders(token);
  const res = await fetch(`${BACKEND_URL}/api/v1/admin/services`, {
    headers,
    cache: "no-store",
  });
  if (!res.ok) return { error: "Failed to fetch services" };
  return res.json();
}

export async function getServiceById(id: string, token?: string) {
  const headers = await getHeaders(token);
  const res = await fetch(`${BACKEND_URL}/api/v1/admin/services/${id}`, {
    headers,
    cache: "no-store",
  });
  if (!res.ok) return { error: "Failed to fetch service details" };
  return res.json();
}

export async function updateService(id: string, payload: any, token?: string) {
  const headers = await getHeaders(token);
  const res = await fetch(`${BACKEND_URL}/api/v1/admin/services/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) return { error: "Failed to update service" };
  return res.json();
}

export async function deleteService(id: string, token?: string) {
  const headers = await getHeaders(token);
  const res = await fetch(`${BACKEND_URL}/api/v1/admin/services/${id}`, {
    method: "DELETE",
    headers,
    cache: "no-store",
  });
  if (!res.ok) return { error: "Failed to delete service" };
  return res.json();
}
