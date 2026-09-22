"use client";

import { useEffect, useMemo, useState } from "react";
import { FiUsers, FiSearch, FiShield, FiUserCheck, FiSlash, FiCheckCircle, FiRefreshCw, FiAlertCircle, FiFilter,} from "react-icons/fi";
import { getUsers, updateUserStatusApi } from "@/lib/api/admin_api/GetAllUser";

interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  emailVerified?: boolean;
  status?: "active" | "blocked";
  createdAt?: string;
}

const PAGE_SIZE = 8;

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [actionId, setActionId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const result = await getUsers();
      if (!result.error && Array.isArray(result.data)) {
        setUsers(result.data);
      } else {
        showNotification("Failed to load users", "error");
      }
    } catch {
      showNotification("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleToggleBlock = async (user: User) => {
    const newStatus: "active" | "blocked" = user.status === "blocked" ? "active" : "blocked";
    setActionId(user._id);
    try {
      const res = await updateUserStatusApi(user._id, newStatus);
      if (!res.error) {
        setUsers((prev) =>
          prev.map((u) => (u._id === user._id ? { ...u, status: newStatus } : u))
        );
        showNotification(
          `User ${user.name} has been ${newStatus === "blocked" ? "blocked" : "unblocked"}`
        );
      } else {
        showNotification(res.error || "Failed to update user status", "error");
      }
    } catch {
      showNotification("Failed to execute request", "error");
    } finally {
      setActionId(null);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (u._id || "").toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "all" || (u.role || "").toLowerCase() === roleFilter.toLowerCase();
      const currentStatus = u.status || "active";
      const matchesStatus = statusFilter === "all" || currentStatus === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, page]);

  return (
    <div className="space-y-6">
      {/* Toast alert */}
      {notification && (
        <div
          className={`fixed right-6 top-6 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg transition-all ${
            notification.type === "success"
              ? "bg-[#15803D] text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {notification.type === "success" ? <FiCheckCircle size={16} /> : <FiAlertCircle size={16} />}
          {notification.text}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#15803D] dark:text-[#22C55E]">
            <FiShield className="size-3.5" />
            Access Control & Management
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#1C1917] dark:text-[#F4F4F5] sm:text-3xl">
            User Accounts & Roles
          </h1>
          <p className="mt-0.5 text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
            Review all registered platform accounts and manage user permissions or access blocks.
          </p>
        </div>

        <button
          onClick={fetchUserList}
          disabled={loading}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1917]/80 shadow-sm transition hover:bg-black/5 disabled:opacity-50 dark:border-white/10 dark:bg-[#27272A] dark:text-[#A1A1AA] dark:hover:bg-white/5"
        >
          <FiRefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#1C1917]/40 dark:text-[#A1A1AA]/60" />
          <input
            type="text"
            placeholder="Search by name, email, or user ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-black/10 bg-white py-2.5 pl-10 pr-4 text-xs text-[#1C1917] outline-none transition focus:border-[#15803D] dark:border-white/10 dark:bg-[#27272A] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-black/10 bg-white px-3 py-2.5 text-xs text-[#1C1917] outline-none dark:border-white/10 dark:bg-[#27272A] dark:text-[#F4F4F5]"
          >
            <option value="all">All Roles</option>
            <option value="user">Customers / Users</option>
            <option value="provider">Service Providers</option>
            <option value="admin">Admins</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-black/10 bg-white px-3 py-2.5 text-xs text-[#1C1917] outline-none dark:border-white/10 dark:bg-[#27272A] dark:text-[#F4F4F5]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-[#27272A]">
        {loading ? (
          <div className="space-y-4 p-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded-xl bg-black/5 dark:bg-white/5" />
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/10 py-12 text-center dark:border-white/10">
            <FiUsers className="mx-auto size-8 text-[#1C1917]/30 dark:text-[#A1A1AA]/40" />
            <p className="mt-2 text-xs font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
              No users found
            </p>
            <p className="mt-0.5 text-[11px] text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
              Try adjusting your search criteria or role filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-black/5 bg-[#FAF9F7]/70 text-[11px] font-bold uppercase tracking-wider text-[#1C1917]/60 dark:border-white/5 dark:bg-[#18181B]/50 dark:text-[#A1A1AA]">
                <tr>
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-5 py-3.5">Role</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Email Verification</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {paginatedUsers.map((user) => {
                  const isBlocked = user.status === "blocked";
                  const isAdmin = user.role?.toLowerCase() === "admin";

                  return (
                    <tr
                      key={user._id}
                      className="transition hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-[#1C1917]/50 dark:text-[#A1A1AA]">
                            {user.email}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            user.role === "admin"
                              ? "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
                              : user.role === "provider"
                              ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
                              : "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                          }`}
                        >
                          {user.role || "user"}
                        </span>
                      </td>

                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                            isBlocked
                              ? "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                              : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              isBlocked ? "bg-red-500" : "bg-emerald-500"
                            }`}
                          />
                          {isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>

                      <td className="px-5 py-3.5">
                        <span
                          className={`text-[11px] font-medium ${
                            user.emailVerified
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {user.emailVerified ? "Verified" : "Unverified"}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        {isAdmin ? (
                          <span className="text-[10px] text-[#1C1917]/40 dark:text-[#A1A1AA]/50">
                            Admin Protected
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleToggleBlock(user)}
                            disabled={actionId === user._id}
                            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                              isBlocked
                                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400"
                                : "bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400"
                            } disabled:opacity-50`}
                          >
                            {actionId === user._id ? (
                              <FiRefreshCw className="size-3.5 animate-spin" />
                            ) : isBlocked ? (
                              <>
                                <FiUserCheck className="size-3.5" />
                                Unblock
                              </>
                            ) : (
                              <>
                                <FiSlash className="size-3.5" />
                                Block
                              </>
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {filteredUsers.length > PAGE_SIZE && (
          <div className="flex items-center justify-between border-t border-black/5 px-5 py-3 text-xs dark:border-white/5">
            <span className="text-[#1C1917]/50 dark:text-[#A1A1AA]">
              Showing {(page - 1) * PAGE_SIZE + 1} to{" "}
              {Math.min(page * PAGE_SIZE, filteredUsers.length)} of {filteredUsers.length} users
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-black/10 px-2.5 py-1 font-medium transition hover:bg-black/5 disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/5"
              >
                Prev
              </button>
              <span className="px-2 font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-black/10 px-2.5 py-1 font-medium transition hover:bg-black/5 disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/5"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
