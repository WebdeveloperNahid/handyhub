"use client";

import { FormEvent } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("Thanks! Your message has been submitted.");
  };

  return (
    <main className="min-h-screen bg-white px-4 py-16 text-[#291C0E] transition-colors duration-300 dark:bg-[#1F1712] dark:text-[#E1D4C2] sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold sm:text-4xl">
            Get in Touch
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[#6E473B] dark:text-[#C5B8AA]">
            Have a question, feedback, or need help? We would love to hear
            from you.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl bg-[#291C0E] p-8 text-[#E1D4C2] shadow-lg dark:bg-[#2D211A]"
          >
            <h2 className="text-2xl font-semibold">
              Contact HandyHub
            </h2>

            <p className="mt-3 leading-7 text-[#BEB5A9]">
              Our team is here to help with questions, feedback, and
              platform-related support.
            </p>

            <div className="mt-8 space-y-6">

              {/* Email */}
              <div>
                <p className="text-sm text-[#A78D78]">
                  Email
                </p>

                <p className="mt-1">
                  support@handyhub.com
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-sm text-[#A78D78]">
                  Phone
                </p>

                <p className="mt-1">
                  +880 1XXX-XXXXXX
                </p>
              </div>

              {/* Location */}
              <div>
                <p className="text-sm text-[#A78D78]">
                  Location
                </p>

                <p className="mt-1">
                  Bangladesh
                </p>
              </div>

            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#BEB5A9]/40 bg-[#E1D4C2]/40 p-8 shadow-sm transition-colors dark:border-[#A78D78]/30 dark:bg-[#2D211A]"
          >
            <h2 className="text-2xl font-semibold">
              Send us a message
            </h2>

            <div className="mt-6 space-y-5">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Name
                </label>

                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-[#BEB5A9] bg-white px-4 py-3 text-[#291C0E] outline-none transition placeholder:text-[#6E473B]/60 focus:border-[#6E473B] dark:border-[#A78D78]/40 dark:bg-[#382820] dark:text-[#E1D4C2] dark:placeholder:text-[#C5B8AA]/60 dark:focus:border-[#A78D78]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-[#BEB5A9] bg-white px-4 py-3 text-[#291C0E] outline-none transition placeholder:text-[#6E473B]/60 focus:border-[#6E473B] dark:border-[#A78D78]/40 dark:bg-[#382820] dark:text-[#E1D4C2] dark:placeholder:text-[#C5B8AA]/60 dark:focus:border-[#A78D78]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Message
                </label>

                <textarea
                  required
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-lg border border-[#BEB5A9] bg-white px-4 py-3 text-[#291C0E] outline-none transition placeholder:text-[#6E473B]/60 focus:border-[#6E473B] dark:border-[#A78D78]/40 dark:bg-[#382820] dark:text-[#E1D4C2] dark:placeholder:text-[#C5B8AA]/60 dark:focus:border-[#A78D78]"
                />
              </div>

              {/* Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-lg bg-[#6E473B] px-5 py-3 font-medium text-[#E1D4C2] transition-colors hover:bg-[#A78D78] hover:text-[#291C0E] dark:bg-[#A78D78] dark:text-[#291C0E] dark:hover:bg-[#C5B8AA]"
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