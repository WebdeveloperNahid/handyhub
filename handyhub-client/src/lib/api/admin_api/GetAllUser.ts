"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function getUsers() {
  const res = await fetch(`${BACKEND_URL}/api/v1/admin/users`, {
    cache: "no-store",
  });

  if (!res.ok) return { error: "Failed to fetch users" };

  return res.json();
}

export async function updateUserStatusApi(userId: string, status: "active" | "blocked") {
  let token = "";
  try {
    const cookieStore = await cookies();
    token =
      cookieStore.get("better-auth.session_token")?.value ||
      cookieStore.get("__Secure-better-auth.session_token")?.value ||
      cookieStore.get("token")?.value ||
      "";
  } catch {
    // ignore outside request context
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  }

  const res = await fetch(`${BACKEND_URL}/api/v1/admin/users/${userId}/status`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ status }),
    cache: "no-store",
  });

  if (!res.ok) return { error: "Failed to update user status" };

  return res.json();
}