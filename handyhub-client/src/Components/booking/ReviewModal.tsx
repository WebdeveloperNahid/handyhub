"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiX } from "react-icons/fi";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  bookingId: string;
  onSubmit: (data: {
    rating: number;
    comment: string;
    bookingId: string;
  }) => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  serviceTitle,
  bookingId,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, comment, bookingId });
    setComment("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg rounded-3xl border border-black/10 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#27272A]"
        >
          <div className="flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/10">
            <h3 className="text-xl font-bold text-[#1C1917] dark:text-[#F4F4F5]">
              Leave a Review
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-[#1C1917]/60 hover:bg-black/5 dark:text-[#A1A1AA] dark:hover:bg-white/5"
            >
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <p className="text-sm font-medium text-[#1C1917]/70 dark:text-[#A1A1AA]">
                Service:{" "}
                <span className="font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                  {serviceTitle}
                </span>
              </p>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                Your Rating
              </label>
              <div className="mt-2 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="p-1 focus:outline-none"
                  >
                    <FiStar
                      size={28}
                      className={`${
                        star <= (hover || rating)
                          ? "fill-[#15803D] text-[#15803D] dark:fill-[#22C55E] dark:text-[#22C55E]"
                          : "text-black/20 dark:text-white/20"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Area */}
            <div>
              <label className="block text-sm font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                Feedback
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this service provider..."
                className="mt-2 w-full rounded-2xl border border-black/10 bg-transparent p-4 text-sm outline-none transition focus:border-[#15803D] dark:border-white/10 dark:focus:border-[#22C55E]"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-[#1C1917]/70 hover:bg-black/5 dark:text-[#A1A1AA] dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#15803D] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#15803D]/90 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#22C55E]/90"
              >
                Submit Review
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
