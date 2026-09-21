import type { ProviderService } from "@/types/index";

const SERVER_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NEXT_PUBLIC_SERVER_URL
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`
    : "http://localhost:5000/api/v1");

const BASE_URL = SERVER_URL.replace(/\/+$/, "");

/**
 * Fetch all available/active public services (no auth required)
 */
export async function fetchAllServices(): Promise<ProviderService[]> {
  const response = await fetch(`${BASE_URL}/customer/services`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch services with status ${response.status}`);
  }

  const json = await response.json().catch(() => ({}));
  const data = json.data !== undefined ? json.data : json;
  return Array.isArray(data) ? data : [];
}

/**
 * Fetch a single public service by ID
 */
export async function fetchPublicServiceById(id: string): Promise<ProviderService | null> {
  const response = await fetch(`${BASE_URL}/customer/services/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const json = await response.json().catch(() => ({}));
  return (json.data !== undefined ? json.data : json) as ProviderService;
}
