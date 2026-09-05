"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import animation from "";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF9F7] px-6 py-16 text-[#1C1917] dark:bg-[#18181B] dark:text-[#F4F4F5]">
      {/* Background decorations */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[8%] top-[15%] h-20 w-20 rounded-full bg-[#FBBF24]/20 blur-xl"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[15%] right-[8%] h-28 w-28 rounded-full bg-[#22C55E]/20 blur-2xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center md:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="inline-block rounded-full bg-[#15803D] px-4 py-2 text-sm font-semibold text-[#FAF9F7] dark:bg-[#22C55E] dark:text-[#18181B]"
            >
              Oops! Page Not Found
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.25,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 text-8xl font-black tracking-tight sm:text-9xl"
            >
              <span className="text-[#F59E0B] dark:text-[#FBBF24]">4</span>
              <motion.span
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block text-[#F59E0B] dark:text-[#FBBF24]"
              >
                0
              </motion.span>
              <span className="text-[#F59E0B] dark:text-[#FBBF24]">4</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-3 text-2xl font-bold sm:text-3xl"
            >
              Looks like you took a wrong turn.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mx-auto mt-4 max-w-lg leading-7 text-[#1C1917]/75 dark:text-[#A1A1AA] md:mx-0"
            >
              The page you're looking for doesn't exist or may have been moved.
              Let's get you back to somewhere useful.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start"
            >
              <Link
                href="/"
                className="group flex items-center justify-center gap-2 rounded-xl bg-[#15803D] px-6 py-3 font-medium text-[#FAF9F7] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#22C55E] hover:text-[#18181B] hover:shadow-lg dark:bg-[#22C55E] dark:text-[#18181B] dark:hover:bg-[#FBBF24]"
              >
                <FiHome size={18} />
                Back to Home
              </Link>

              <Link
                href="/all-services"
                className="flex items-center justify-center gap-2 rounded-xl border border-black/20 bg-white/50 px-6 py-3 font-medium transition-all duration-300 hover:-translate-y-1 hover:border-[#FBBF24] hover:bg-white dark:border-white/15 dark:bg-[#202023] dark:hover:bg-[#27272A]"
              >
                <FiSearch size={18} />
                Browse Services
              </Link>
            </motion.div>
          </motion.div>

          {/* GIF / Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full max-w-md"
            >
              {/* Glow */}
              <div className="absolute inset-10 rounded-full bg-[#22C55E]/20 blur-3xl" />

              {/* GIF */}
              <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/40 p-4 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-[#202023]/80">
                <DotLottieReact
                  src="/animations/tjewiTGaee.lottie"
                  loop
                  autoplay
                  className="h-auto w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-14 text-center text-sm text-[#1C1917]/70 dark:text-[#A1A1AA]/70"
        >
          <FiArrowLeft className="mr-1 inline-block" size={14} />
          HandyHub is here to help you find your way.
        </motion.div>
      </div>
    </main>
  );
}
