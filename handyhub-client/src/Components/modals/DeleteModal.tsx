"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiAlertTriangle, FiX } from "react-icons/fi";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  description = "Are you sure you want to proceed? This action cannot be undone.",
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#27272A]"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400">
              <FiAlertTriangle size={24} />
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-[#1C1917]/60 hover:bg-black/5 dark:text-[#A1A1AA] dark:hover:bg-white/5"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <h3 className="text-xl font-bold text-[#1C1917] dark:text-[#F4F4F5]">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-[#1C1917]/70 dark:text-[#A1A1AA]">
              {description}
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-[#1C1917]/70 hover:bg-black/5 dark:text-[#A1A1AA] dark:hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <FiTrash2 size={16} /> Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
