"use client";

import { FormEvent } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("Thanks! Your message has been submitted.");
  };

  return (
    <main className="min-h-screen bg-[#FAF9F7] px-4 py-16 text-[#1C1917] transition-colors duration-300 dark:bg-[#18181B] dark:text-[#F4F4F5] sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold sm:text-4xl">Get in Touch</h1>

          <p className="mx-auto mt-3 max-w-2xl text-[#1C1917]/70 dark:text-[#A1A1AA]">
            Have a question, feedback, or need help? We would love to hear from
            you.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl bg-[#18181B] p-8 text-white shadow-lg dark:bg-[#27272A]"
          >
            <h2 className="text-2xl font-semibold">Contact HandyHub</h2>

            <p className="mt-3 leading-7 text-[#A1A1AA]">
              Our team is here to help with questions, feedback, and
              platform-related support.
            </p>

            <div className="mt-8 space-y-6">
              {/* Email */}
              <div>
                <p className="text-sm font-medium text-[#22C55E]">Email</p>

                <p className="mt-1 text-[#F4F4F5]">support@handyhub.com</p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-sm font-medium text-[#22C55E]">Phone</p>

                <p className="mt-1 text-[#F4F4F5]">+880 1XXX-XXXXXX</p>
              </div>

              {/* Location */}
              <div>
                <p className="text-sm font-medium text-[#22C55E]">Location</p>

                <p className="mt-1 text-[#F4F4F5]">Bangladesh</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm transition-colors dark:border-white/10 dark:bg-[#27272A]"
          >
            <h2 className="text-2xl font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
              Send us a message
            </h2>

            <div className="mt-6 space-y-5">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C1917] dark:text-[#F4F4F5]">
                  Name
                </label>

                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-black/10 bg-[#FAF9F7] px-4 py-3 text-[#1C1917] outline-none transition placeholder:text-[#1C1917]/50 focus:border-[#15803D] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/60 dark:focus:border-[#22C55E]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C1917] dark:text-[#F4F4F5]">
                  Email
                </label>

                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-black/10 bg-[#FAF9F7] px-4 py-3 text-[#1C1917] outline-none transition placeholder:text-[#1C1917]/50 focus:border-[#15803D] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/60 dark:focus:border-[#22C55E]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C1917] dark:text-[#F4F4F5]">
                  Message
                </label>

                <textarea
                  required
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-lg border border-black/10 bg-[#FAF9F7] px-4 py-3 text-[#1C1917] outline-none transition placeholder:text-[#1C1917]/50 focus:border-[#15803D] dark:border-white/10 dark:bg-[#18181B] dark:text-[#F4F4F5] dark:placeholder:text-[#A1A1AA]/60 dark:focus:border-[#22C55E]"
                />
              </div>

              {/* Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-lg bg-[#15803D] px-5 py-3 font-medium text-white transition-colors hover:bg-[#15803D]/90 dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#22C55E]/90"
              >
                Send Message
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </main>
  );
}
