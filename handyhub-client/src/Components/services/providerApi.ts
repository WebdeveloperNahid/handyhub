import { authClient } from "@/lib/auth-client";
import type { ProviderService, ServiceFormValues } from "@/types/index";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const BASE_URL = `${SERVER_URL}/api/v1/provider`;

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

// Every provider route on the server is protected by verifyToken, which
// expects "Authorization: Bearer <session-token>". Better Auth keeps that
// token on the session object, so we read it fresh before every call.
async function getAuthHeaders() {
  const { data } = await authClient.getSession();
  const token = data?.session?.token;

  if (!token) {
    throw new Error("You must be logged in to do this.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function parseResponse<T>(res: Response): Promise<T> {
  const body: ApiResponse<T> = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(body?.message || "Something went wrong. Please try again.");
  }

  return (body.data ?? (body as unknown as T)) as T;
}

export async function fetchMyServices(): Promise<ProviderService[]> {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/services`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  return parseResponse<ProviderService[]>(res);
}

export function buildServicePayload(values: ServiceFormValues) {
  return {
    title: values.title.trim(),
    category: values.category,
    description: values.description.trim(),
    price: Number(values.price),
    duration: values.duration.trim(),
    image: values.image.trim(),
    status: values.status,
  };
}

export async function createService(
  values: ServiceFormValues,
): Promise<ProviderService> {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/services`, {
    method: "POST",
    headers,
    body: JSON.stringify(buildServicePayload(values)),
  });

  return parseResponse<ProviderService>(res);
}

export async function updateService(
  serviceId: string,
  values: ServiceFormValues,
): Promise<ProviderService> {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/services/${serviceId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(buildServicePayload(values)),
  });

  return parseResponse<ProviderService>(res);
}

export async function deleteService(serviceId: string): Promise<void> {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/services/${serviceId}`, {
    method: "DELETE",
    headers,
  });

  await parseResponse<null>(res);
}
