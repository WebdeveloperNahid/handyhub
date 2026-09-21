const BACKEND_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

/**
 * Fetch all active services from the backend
 */
export async function getAllServices() {
  const res = await fetch(`${BACKEND_URL}/api/v1/customer/services`, {
    cache: "no-store",
  });

  if (!res.ok) return { error: "Failed to fetch services" };

  return res.json();
}

/**
 * Fetch single service details by ID
 */
export async function getServiceById(id: string) {
  const res = await fetch(`${BACKEND_URL}/api/v1/customer/services/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return { error: "Failed to fetch service" };

  return res.json();
}
