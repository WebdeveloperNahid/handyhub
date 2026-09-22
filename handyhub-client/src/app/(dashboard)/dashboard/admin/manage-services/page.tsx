"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import {
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "@/lib/api/admin_api/manageServiceApi";
import { ToastNotification, ToastMessage } from "@/Components/shared/ToastNotification";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiAlertTriangle,
  FiSearch,
  FiX,
  FiLoader,
  FiLayers,
} from "react-icons/fi";

export interface IService {
  _id: string;
  title: string;
  description: string;
  price: number;
  category?: string;
  providerId: string;
  status: "active" | "inactive" | "pending";
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateServicePayload {
  [key: string]: unknown;
  title?: string;
  price?: number;
  category?: string;
  description?: string;
  status?: "active" | "inactive" | "pending";
}

export default function ManageServicesPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modals state
  const [detailModalService, setDetailModalService] = useState<IService | null>(null);
  const [fetchingDetail, setFetchingDetail] = useState(false);

  const [editModalService, setEditModalService] = useState<IService | null>(null);
  const [editForm, setEditForm] = useState<UpdateServicePayload>({});
  const [updating, setUpdating] = useState(false);

  const [deleteModalService, setDeleteModalService] = useState<IService | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Pure Counter for Toast IDs
  const toastIdRef = useRef(0);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", text: string) => {
    const id = `toast-${toastIdRef.current++}`;
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch Services List
  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllServices();
      if (res?.success || Array.isArray(res?.data)) {
        setServices(res.data || []);
      } else {
        setError(res?.error || res?.message || "Failed to load services");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch Details
  const handleViewDetails = async (id: string) => {
    setFetchingDetail(true);
    try {
      const res = await getServiceById(id);
      if (res?.success || res?.data) {
        setDetailModalService(res.data);
      } else {
        addToast("error", res?.error || res?.message || "Could not fetch service details.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load service details.";
      addToast("error", message);
    } finally {
      setFetchingDetail(false);
    }
  };

  const handleCloseDetailModal = () => {
    setDetailModalService(null);
    setFetchingDetail(false);
  };

  // Open Edit Modal
  const handleOpenEdit = (service: IService) => {
    setEditModalService(service);
    setEditForm({
      title: service.title || "",
      price: service.price || 0,
      category: service.category || "",
      description: service.description || "",
      status: service.status || "active",
    });
  };

  // Submit Edit
  const handleUpdateService = async (e: FormEvent) => {
    e.preventDefault();
    if (!editModalService) return;

    setUpdating(true);
    try {
      const res = await updateService(editModalService._id, editForm);
      if (res?.success || res?.data?.modifiedCount || res?.message) {
        addToast("success", res?.message || "Service updated successfully");
        setEditModalService(null);
        fetchServices();
      } else {
        addToast("error", res?.error || res?.message || "Failed to update service");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error updating service";
      addToast("error", message);
    } finally {
      setUpdating(false);
    }
  };

  // Confirm Delete
  const handleDeleteService = async () => {
    if (!deleteModalService) return;

    setDeleting(true);
    try {
      const res = await deleteService(deleteModalService._id);
      if (res?.success || res?.data?.deletedCount || res?.message) {
        addToast("success", res?.message || "Service deleted successfully");
        setDeleteModalService(null);
        fetchServices();
      } else {
        addToast("error", res?.error || res?.message || "Failed to delete service");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error deleting service";
      addToast("error", message);
    } finally {
      setDeleting(false);
    }
  };

  // Filtered Services
  const filteredServices = (services || []).filter((svc) => {
    const matchesSearch =
      svc.title?.toLowerCase().includes(search.toLowerCase()) ||
      svc.category?.toLowerCase().includes(search.toLowerCase()) ||
      svc.providerId?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || svc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification Container */}
      <ToastNotification toasts={toasts} onDismiss={removeToast} />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1917] dark:text-[#F4F4F5]">
            Manage Services
          </h1>
          <p className="text-sm text-[#1C1917]/70 dark:text-[#A1A1AA]">
            View, inspect details, update, and manage all provider services.
          </p>
        </div>

        <button
          onClick={fetchServices}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-[#1C1917] shadow-sm transition hover:bg-neutral-50 disabled:opacity-50 dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:hover:bg-neutral-800"
        >
          <FiRefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#1C1917]/40 dark:text-[#A1A1AA]/60" />
          <input
            type="text"
            placeholder="Search by title, category, or provider ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white py-2.5 pl-10 pr-4 text-sm text-[#1C1917] outline-none transition focus:border-[#15803D] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-[#1C1917] outline-none dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5]"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#18181B]">
          <div className="space-y-4 animate-pulse">
            <div className="h-6 w-1/4 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-10 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-10 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-10 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center dark:bg-red-500/10">
          <FiAlertTriangle className="mx-auto size-8 text-red-500" />
          <h3 className="mt-2 text-lg font-semibold text-red-600 dark:text-red-400">
            Error Loading Services
          </h3>
          <p className="mt-1 text-sm text-red-500/80">{error}</p>
          <button
            onClick={fetchServices}
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/20 p-12 text-center dark:border-white/20">
          <FiLayers className="mx-auto size-10 text-[#15803D] dark:text-[#22C55E]" />
          <h3 className="mt-4 text-lg font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
            No services found
          </h3>
          <p className="mt-1 text-sm text-[#1C1917]/70 dark:text-[#A1A1AA]">
            {search || statusFilter !== "all"
              ? "No services match your active search or filter criteria."
              : "No services have been submitted yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-[#18181B]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/10 bg-neutral-50/50 text-xs font-semibold uppercase text-[#1C1917]/60 dark:border-white/10 dark:bg-neutral-900/50 dark:text-[#A1A1AA]">
              <tr>
                <th className="px-5 py-3.5">Service Title</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Provider ID</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/10">
              {filteredServices.map((service) => (
                <tr
                  key={service._id}
                  className="transition hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50"
                >
                  <td className="px-5 py-4 font-medium text-[#1C1917] dark:text-[#F4F4F5]">
                    {service.title}
                  </td>
                  <td className="px-5 py-4 text-[#1C1917]/80 dark:text-[#A1A1AA]">
                    {service.category || "Uncategorized"}
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#15803D] dark:text-[#22C55E]">
                    ৳{service.price}
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-[#1C1917]/60 dark:text-[#A1A1AA]">
                    {service.providerId}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                        service.status === "active"
                          ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                          : service.status === "pending"
                          ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
                          : "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewDetails(service._id)}
                        title="View Details"
                        className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                      >
                        <FiEye className="size-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(service)}
                        title="Edit Service"
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-500/10 dark:text-blue-400"
                      >
                        <FiEdit2 className="size-4" />
                      </button>
                      <button
                        onClick={() => setDeleteModalService(service)}
                        title="Delete Service"
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-500/10 dark:text-red-400"
                      >
                        <FiTrash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {(detailModalService || fetchingDetail) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#18181B]">
            <div className="flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/10">
              <h3 className="text-lg font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                Service Details
              </h3>
              <button
                onClick={handleCloseDetailModal}
                className="rounded-lg p-1 text-[#1C1917]/60 transition hover:bg-neutral-100 dark:text-[#A1A1AA] dark:hover:bg-neutral-800"
              >
                <FiX className="size-5" />
              </button>
            </div>

            {fetchingDetail ? (
              <div className="py-12 text-center">
                <FiLoader className="mx-auto size-8 animate-spin text-[#15803D] dark:text-[#22C55E]" />
                <p className="mt-2 text-sm text-[#1C1917]/70 dark:text-[#A1A1AA]">
                  Loading service details...
                </p>
              </div>
            ) : detailModalService ? (
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <span className="text-xs font-medium uppercase text-[#1C1917]/50 dark:text-[#A1A1AA]">
                    Title
                  </span>
                  <p className="text-base font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                    {detailModalService.title}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-medium uppercase text-[#1C1917]/50 dark:text-[#A1A1AA]">
                      Category
                    </span>
                    <p className="font-medium text-[#1C1917] dark:text-[#F4F4F5]">
                      {detailModalService.category || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium uppercase text-[#1C1917]/50 dark:text-[#A1A1AA]">
                      Price
                    </span>
                    <p className="font-bold text-[#15803D] dark:text-[#22C55E]">
                      ৳{detailModalService.price}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-medium uppercase text-[#1C1917]/50 dark:text-[#A1A1AA]">
                      Status
                    </span>
                    <p className="capitalize font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                      {detailModalService.status}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium uppercase text-[#1C1917]/50 dark:text-[#A1A1AA]">
                      Provider ID
                    </span>
                    <p className="font-mono text-xs text-[#1C1917]/80 dark:text-[#A1A1AA]">
                      {detailModalService.providerId}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-medium uppercase text-[#1C1917]/50 dark:text-[#A1A1AA]">
                    Description
                  </span>
                  <p className="mt-1 rounded-xl bg-neutral-50 p-3 text-sm text-[#1C1917]/80 dark:bg-neutral-900 dark:text-[#A1A1AA]">
                    {detailModalService.description}
                  </p>
                </div>

                {detailModalService.createdAt && (
                  <div className="text-xs text-[#1C1917]/50 dark:text-[#A1A1AA]/60">
                    Created: {new Date(detailModalService.createdAt).toLocaleString()}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {editModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleUpdateService}
            className="w-full max-w-md space-y-4 rounded-2xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#18181B]"
          >
            <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
              <h3 className="text-lg font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                Edit Service
              </h3>
              <button
                type="button"
                onClick={() => setEditModalService(null)}
                className="rounded-lg p-1 text-[#1C1917]/60 hover:bg-neutral-100 dark:text-[#A1A1AA] dark:hover:bg-neutral-800"
              >
                <FiX className="size-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#1C1917]/70 dark:text-[#A1A1AA]">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editForm.title || ""}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[#1C1917] outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-[#F4F4F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#1C1917]/70 dark:text-[#A1A1AA]">
                    Price (৳)
                  </label>
                  <input
                    type="number"
                    required
                    value={editForm.price ?? ""}
                    onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[#1C1917] outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-[#F4F4F5]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#1C1917]/70 dark:text-[#A1A1AA]">
                    Status
                  </label>
                  <select
                    value={editForm.status || "active"}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        status: e.target.value as "active" | "inactive" | "pending",
                      })
                    }
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[#1C1917] outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-[#F4F4F5]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-[#1C1917]/70 dark:text-[#A1A1AA]">
                  Category
                </label>
                <input
                  type="text"
                  value={editForm.category || ""}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[#1C1917] outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-[#F4F4F5]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-[#1C1917]/70 dark:text-[#A1A1AA]">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editForm.description || ""}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[#1C1917] outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-[#F4F4F5]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditModalService(null)}
                className="rounded-xl border border-black/10 px-4 py-2 text-sm font-medium text-[#1C1917] hover:bg-neutral-100 dark:border-white/10 dark:text-[#F4F4F5] dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#15803D]/90 disabled:opacity-50 dark:bg-[#22C55E] dark:text-[#18181B]"
              >
                {updating && <FiLoader className="animate-spin size-4" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm space-y-4 rounded-2xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#18181B]">
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
                <FiTrash2 className="size-6" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                Delete Service?
              </h3>
              <p className="mt-1 text-sm text-[#1C1917]/70 dark:text-[#A1A1AA]">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                  &quot;{deleteModalService.title}&quot;
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalService(null)}
                className="w-1/2 rounded-xl border border-black/10 py-2.5 text-sm font-medium text-[#1C1917] hover:bg-neutral-100 dark:border-white/10 dark:text-[#F4F4F5] dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteService}
                disabled={deleting}
                className="inline-flex w-1/2 items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleting && <FiLoader className="animate-spin size-4" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}