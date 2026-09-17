import type { ProviderService, ServiceFormValues } from "@/types/index";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

/**
 * Helper function to handle API response errors
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Request failed with status ${response.status}`,
    );
  }
  return response.json();
}

/**
 * Fetch all services belonging to the logged-in provider
 */
export async function fetchMyServices(): Promise<ProviderService[]> {
  const response = await fetch(`${BASE_URL}/provider/services`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Server/Client Component অনুযায়ী প্রয়োজনমতো cache strategy সেট করুন
    cache: "no-store",
  });

  return handleResponse<ProviderService[]>(response);
}

/**
 * Create a new service
 */
export async function createService(
  values: ServiceFormValues,
): Promise<ProviderService> {
  const response = await fetch(`${BASE_URL}/provider/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return handleResponse<ProviderService>(response);
}

/**
 * Update an existing service by ID
 */
export async function updateService(
  id: string,
  values: ServiceFormValues,
): Promise<ProviderService> {
  const response = await fetch(`${BASE_URL}/provider/services/${id}`, {
    method: "PUT", // অথবা প্রয়োজন অনুযায়ী 'PATCH'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return handleResponse<ProviderService>(response);
}

/**
 * Delete a service by ID
 */
export async function deleteService(id: string): Promise<{ success: boolean }> {
  const response = await fetch(`${BASE_URL}/provider/services/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<{ success: boolean }>(response);
}
