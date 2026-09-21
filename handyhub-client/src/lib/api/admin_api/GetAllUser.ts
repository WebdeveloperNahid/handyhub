"use server"
const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL|| "http://localhost:5000";


export async function getUsers() {
  const res = await fetch(`${BACKEND_URL}/api/v1/admin/users`, {
    cache: "no-store",
  });

  if (!res.ok) return { error: "Failed to fetch users" };

  return res.json();
}