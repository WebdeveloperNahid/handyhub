"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle, FiRefreshCw, FiTool } from "react-icons/fi";

import MyServicesHeader from "@/Components/dashboard/provider/MyServicesHeader";
import ProviderServiceCard from "@/Components/dashboard/provider/ProviderServiceCard";
import ServiceFormModal from "@/Components/services/ServiceFormModal";
import ServiceGridSkeleton from "@/Components/dashboard/provider/ServiceGridSkeleton";
import DeleteModal from "@/Components/modals/DeleteModal";

import {
  createService,
  deleteService,
  fetchMyServices,
  updateService,
} from "@/lib/api/provider";
import type { ProviderService, ServiceFormValues } from "@/types/index";

const MyServicesPage = () => {
  const [services, setServices] = useState<ProviderService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<ProviderService | null>(
    null,
  );

  const [deleteTarget, setDeleteTarget] = useState<ProviderService | null>(
    null,
  );

  const loadServices = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      setError(null);
      const data = await fetchMyServices();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load your services";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchMyServices()
      .then((data) => {
        if (isMounted) {
          setServices(Array.isArray(data) ? data : []);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          const message =
            err instanceof Error ? err.message : "Failed to load your services";
          setError(message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);


  const handleAddNew = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleEdit = (service: ProviderService) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (values: ServiceFormValues) => {
    if (editingService) {
      const updated = await updateService(editingService._id, values);
      setServices((prev) =>
        prev.map((service) =>
          service._id === editingService._id
            ? { ...service, ...updated }
            : service,
        ),
      );
      toast.success("Service updated successfully");
    } else {
      const created = await createService(values);
      setServices((prev) => [created, ...prev]);
      toast.success("Service added successfully");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await deleteService(deleteTarget._id);
      setServices((prev) =>
        prev.filter((service) => service._id !== deleteTarget._id),
      );
      toast.success("Service deleted");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete service";
      toast.error(message);
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-8 text-[#291C0E] dark:text-[#E8DDCE]">
      <MyServicesHeader services={services} onAddNew={handleAddNew} />

      {isLoading ? (
        <ServiceGridSkeleton />
      ) : error ? (
        <div className="rounded-2xl border border-dashed border-red-500/30 bg-red-500/5 py-16 text-center">
          <FiAlertTriangle size={26} className="mx-auto text-red-500" />
          <h3 className="mt-4 text-base font-semibold text-[#18181B] dark:text-[#F4F4F5]">
            Couldn&apos;t load your services
          </h3>
          <p className="mt-1 text-sm text-[#4B5563] dark:text-[#A1A1AA]">
            {error}
          </p>
          <button
            type="button"
            onClick={() => loadServices(true)}
            className="mx-auto mt-5 inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#166534] dark:bg-[#22C55E] dark:text-[#151618] dark:hover:bg-[#16A34A]"
          >
            <FiRefreshCw size={15} />
            Try again
          </button>

        </div>
      ) : services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/20 py-20 text-center dark:border-white/20">
          <FiTool
            size={28}
            className="mx-auto text-[#15803D] dark:text-[#22C55E]"
          />
          <h3 className="mt-4 text-lg font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
            You haven&apos;t added any services yet
          </h3>
          <p className="mt-2 text-sm text-[#1C1917]/70 dark:text-[#A1A1AA]">
            Add your first service so customers can start booking you.
          </p>
          <button
            type="button"
            onClick={handleAddNew}
            className="mx-auto mt-5 inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#166534] dark:bg-[#22C55E] dark:text-[#151618] dark:hover:bg-[#16A34A]"
          >
            Add New Service
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ProviderServiceCard
              key={service._id}
              service={service}
              index={index}
              onEdit={handleEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <ServiceFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialService={editingService}
      />

      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Service"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default MyServicesPage;
