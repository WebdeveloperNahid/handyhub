import type {
  Booking,
  BookingStatus,
  ProviderService,
  ProviderStats,
  ServiceAvailability,
  ServiceFormValues,
} from "@/types/index";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/**
 * Standardized API response parser.
 * Unwraps `{ success: true, data }` response envelope or falls back to raw data.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const json = await response.json().catch(() => ({}));
  if (!response.ok || json.success === false) {
    const errorMsg =
      json?.error?.message ||
      json?.message ||
      `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }
  return (json.data !== undefined ? json.data : json) as T;
}

/**
 * 1. Fetch all services belonging to the logged-in provider
 */
export async function fetchMyServices(): Promise<ProviderService[]> {
  const response = await fetch(`${BASE_URL}/provider/services`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
  });

  return handleResponse<ProviderService[]>(response);
}

/**
 * 2. Fetch single service details
 */
export async function fetchServiceById(id: string): Promise<ProviderService> {
  const response = await fetch(`${BASE_URL}/provider/services/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
  });

  return handleResponse<ProviderService>(response);
}

/**
 * 3. Create a new service
 */
export async function createService(
  values: Partial<ProviderService> | ServiceFormValues
): Promise<ProviderService> {
  const response = await fetch(`${BASE_URL}/provider/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
  });

  return handleResponse<ProviderService>(response);
}

/**
 * 4. Update an existing service
 */
export async function updateService(
  id: string,
  values: Partial<ProviderService> | ServiceFormValues
): Promise<ProviderService> {
  const response = await fetch(`${BASE_URL}/provider/services/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
  });

  return handleResponse<ProviderService>(response);
}

/**
 * 5. Delete a service
 */
export async function deleteService(id: string): Promise<{ message: string; deleted: boolean }> {
  const response = await fetch(`${BASE_URL}/provider/services/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return handleResponse<{ message: string; deleted: boolean }>(response);
}

/**
 * 6. Update service availability
 */
export async function updateServiceAvailability(
  id: string,
  availability: ServiceAvailability
): Promise<ProviderService> {
  const response = await fetch(`${BASE_URL}/provider/services/${id}/availability`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(availability),
  });

  return handleResponse<ProviderService>(response);
}

/**
 * 7. Fetch provider bookings (with optional status filter)
 */
export async function fetchProviderBookings(status?: string): Promise<Booking[]> {
  const query = status && status !== "All" ? `?status=${encodeURIComponent(status)}` : "";
  const response = await fetch(`${BASE_URL}/provider/bookings${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
  });

  return handleResponse<Booking[]>(response);
}

/**
 * 8. Update booking status
 */
export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus | string
): Promise<Booking> {
  const response = await fetch(`${BASE_URL}/provider/bookings/${bookingId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  return handleResponse<Booking>(response);
}

/**
 * 9. Fetch provider dashboard statistics
 */
export async function fetchProviderStats(): Promise<ProviderStats> {
  const response = await fetch(`${BASE_URL}/provider/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
  });

  return handleResponse<ProviderStats>(response);
}

