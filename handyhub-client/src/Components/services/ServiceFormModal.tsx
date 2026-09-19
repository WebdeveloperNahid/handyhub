"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiUploadCloud,
  FiLoader,
  FiPlusCircle,
  FiSave,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { imgUpload } from "@/lib/imageUpload";
import { SERVICE_CATEGORIES } from "@/types/index";
import type { ProviderService, ServiceFormValues } from "@/types/index";

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ServiceFormValues) => Promise<void>;
  initialService?: ProviderService | null;
}

const emptyForm: ServiceFormValues = {
  title: "",
  category: SERVICE_CATEGORIES[0],
  description: "",
  price: "",
  duration: "",
  image: "",
  status: "active",
};

type FormErrors = Partial<Record<keyof ServiceFormValues, string>>;

export default function ServiceFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialService,
}: ServiceFormModalProps) {
  const [values, setValues] = useState<ServiceFormValues>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditMode = Boolean(initialService);

  // Reset the form every time the modal is opened, pre-filling it when editing
  useEffect(() => {
    if (!isOpen) return;

    if (initialService) {
      setValues({
        title: initialService.title ?? "",
        category: initialService.category ?? SERVICE_CATEGORIES[0],
        description: initialService.description ?? "",
        price: String(initialService.price ?? ""),
        duration: initialService.duration ?? "",
        image: initialService.image ?? "",
        status: initialService.status ?? "active",
      });
    } else {
      setValues(emptyForm);
    }

    setErrors({});
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const handleChange = (field: keyof ServiceFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImagePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uploaded = await imgUpload(file);

      if (!uploaded?.url) {
        toast.error("Image upload failed. Please try again.");
        return;
      }

      handleChange("image", uploaded.url);
      toast.success("Image uploaded");
    } catch (error) {
      console.error("Service image upload error:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!values.title.trim()) {
      nextErrors.title = "Service title is required";
    }

    if (!values.category) {
      nextErrors.category = "Please select a category";
    }

    if (!values.description.trim()) {
      nextErrors.description = "A short description helps customers decide";
    } else if (values.description.trim().length < 10) {
      nextErrors.description = "Description should be at least 10 characters";
    }

    const priceNumber = Number(values.price);
    if (!values.price.trim() || Number.isNaN(priceNumber) || priceNumber <= 0) {
      nextErrors.price = "Enter a valid price greater than 0";
    }

    if (!values.duration.trim()) {
      nextErrors.duration = "Estimated duration is required (e.g. 2 hours)";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    try {
      setIsSaving(true);
      await onSubmit(values);
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#27272A]"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                {isEditMode ? <FiSave size={20} /> : <FiPlusCircle size={20} />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                  {isEditMode ? "Edit Service" : "Add New Service"}
                </h3>
                <p className="text-xs text-[#1C1917]/60 dark:text-[#A1A1AA]">
                  {isEditMode
                    ? "Update the details customers see"
                    : "Fill in the details to publish a new service"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 text-[#1C1917]/60 hover:bg-black/5 dark:text-[#A1A1AA] dark:hover:bg-white/5"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Title */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/70 dark:text-[#A1A1AA]">
                Service Title
              </label>
              <input
                type="text"
                value={values.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Deep Home Cleaning"
                className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#1C1917] outline-none transition-all placeholder:text-[#1C1917]/40 focus:border-[#15803D] dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/50 dark:focus:border-[#22C55E] ${
                  errors.title
                    ? "border-red-500"
                    : "border-black/10 dark:border-white/10"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Category + Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/70 dark:text-[#A1A1AA]">
                  Category
                </label>
                <select
                  value={values.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-[#1C1917] outline-none transition-all focus:border-[#15803D] dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E] ${
                    errors.category
                      ? "border-red-500"
                      : "border-black/10 dark:border-white/10"
                  }`}
                >
                  {SERVICE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-500">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/70 dark:text-[#A1A1AA]">
                  Price (৳)
                </label>
                <input
                  type="number"
                  min="0"
                  value={values.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder="500"
                  className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#1C1917] outline-none transition-all placeholder:text-[#1C1917]/40 focus:border-[#15803D] dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/50 dark:focus:border-[#22C55E] ${
                    errors.price
                      ? "border-red-500"
                      : "border-black/10 dark:border-white/10"
                  }`}
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-500">{errors.price}</p>
                )}
              </div>
            </div>

            {/* Duration + Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/70 dark:text-[#A1A1AA]">
                  Estimated Duration
                </label>
                <input
                  type="text"
                  value={values.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  placeholder="e.g. 2 hours"
                  className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#1C1917] outline-none transition-all placeholder:text-[#1C1917]/40 focus:border-[#15803D] dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/50 dark:focus:border-[#22C55E] ${
                    errors.duration
                      ? "border-red-500"
                      : "border-black/10 dark:border-white/10"
                  }`}
                />
                {errors.duration && (
                  <p className="mt-1 text-xs text-red-500">{errors.duration}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/70 dark:text-[#A1A1AA]">
                  Status
                </label>
                <select
                  value={values.status}
                  onChange={(e) =>
                    handleChange(
                      "status",
                      e.target.value as "active" | "inactive",
                    )
                  }
                  className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[#1C1917] outline-none transition-all focus:border-[#15803D] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:focus:border-[#22C55E]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/70 dark:text-[#A1A1AA]">
                Description
              </label>
              <textarea
                rows={3}
                value={values.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Briefly describe what's included in this service..."
                className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-[#1C1917] outline-none transition-all placeholder:text-[#1C1917]/40 focus:border-[#15803D] dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/50 dark:focus:border-[#22C55E] ${
                  errors.description
                    ? "border-red-500"
                    : "border-black/10 dark:border-white/10"
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Image upload */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#1C1917]/70 dark:text-[#A1A1AA]">
                Service Image (optional)
              </label>

              <div className="flex items-center gap-3">
                {values.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={values.image}
                    alt="Service preview"
                    className="h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-black/10 dark:ring-white/10"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-black/5 text-[#1C1917]/40 dark:bg-white/5 dark:text-[#A1A1AA]/50">
                    <FiUploadCloud size={20} />
                  </div>
                )}

                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-xs font-semibold text-[#1C1917]/80 transition hover:bg-black/5 disabled:opacity-60 dark:border-white/10 dark:text-[#F4F4F5] dark:hover:bg-white/5"
                >
                  {isUploading ? (
                    <>
                      <FiLoader size={14} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FiUploadCloud size={14} />
                      {values.image ? "Change image" : "Upload image"}
                    </>
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImagePick}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-2 flex justify-end gap-3 border-t border-black/10 pt-5 dark:border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-[#1C1917]/70 hover:bg-black/5 dark:text-[#A1A1AA] dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || isUploading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#166534] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#22C55E] dark:text-[#151618] dark:hover:bg-[#16A34A]"
              >
                {isSaving ? (
                  <>
                    <FiLoader size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : isEditMode ? (
                  <>
                    <FiSave size={16} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <FiPlusCircle size={16} />
                    Add Service
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
