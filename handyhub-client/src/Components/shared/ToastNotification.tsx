"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  text: string;
}

interface ToastNotificationProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastNotification = ({ toasts, onDismiss }: ToastNotificationProps) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto flex items-center justify-between gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-md ${
              toast.type === "success"
                ? "border-emerald-500/30 bg-emerald-950/90 text-emerald-200 dark:border-emerald-500/40 dark:bg-emerald-950/95"
                : toast.type === "error"
                ? "border-red-500/30 bg-red-950/90 text-red-200 dark:border-red-500/40 dark:bg-red-950/95"
                : "border-blue-500/30 bg-slate-900/90 text-blue-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && <FiCheckCircle className="size-5 text-emerald-400 shrink-0" />}
              {toast.type === "error" && <FiXCircle className="size-5 text-red-400 shrink-0" />}
              <p className="text-sm font-medium">{toast.text}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="rounded-lg p-1 transition-colors hover:bg-white/10 opacity-80 hover:opacity-100"
              aria-label="Close notification"
            >
              <FiX className="size-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
