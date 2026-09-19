"use client";

import { motion } from "framer-motion";

const privacySections = [
  {
    title: "Introduction",
    content:
      "HandyHub respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how information is collected, used, and protected when you use our platform.",
  },
  {
    title: "Information We Collect",
    content:
      "We may collect information such as your name, email address, profile information, booking information, and other details necessary to provide our services.",
  },
  {
    title: "How We Use Information",
    content:
      "Your information may be used to provide and improve our services, process bookings, communicate with you, and maintain the security of the platform.",
  },
  {
    title: "Data Security",
    content:
      "We take reasonable measures to protect your information from unauthorized access, alteration, disclosure, or destruction.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact the HandyHub team.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F7] px-4 py-16 text-[#1C1917] transition-colors duration-300 dark:bg-[#18181B] dark:text-[#F4F4F5] sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-[#15803D]/10 px-4 py-2 text-sm font-medium text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
            HandyHub Privacy
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm text-[#1C1917]/60 dark:text-[#A1A1AA]">
            Last updated: September 2026
          </p>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#1C1917]/70 dark:text-[#A1A1AA]">
            Your privacy matters to us. Learn how HandyHub collects, uses, and
            protects your information while you use our platform.
          </p>
        </motion.div>

        {/* Privacy Timeline */}
        <div className="relative mt-16">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-black/10 dark:bg-white/10 md:block" />

          <div className="space-y-12 md:space-y-20">
            {privacySections.map((section, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={section.title}
                  className="relative grid md:grid-cols-2"
                >
                  {/* Center Dot */}
                  <div className="absolute left-1/2 top-8 z-10 hidden -translate-x-1/2 md:block">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-4 w-4 rounded-full border-4 border-[#FAF9F7] bg-[#15803D] shadow-md dark:border-[#18181B] dark:bg-[#22C55E]"
                    />
                  </div>

                  {/* Connector */}
                  <div
                    className={`absolute top-10 hidden h-px w-10 bg-black/10 dark:bg-white/10 md:block ${
                      isLeft ? "right-0" : "left-0"
                    }`}
                  />

                  {/* Left */}
                  <div className={`hidden md:block ${isLeft ? "pr-14" : ""}`}>
                    {isLeft && (
                      <PrivacyCard
                        title={section.title}
                        content={section.content}
                        index={index}
                        direction="left"
                      />
                    )}
                  </div>

                  {/* Right */}
                  <div className={`hidden md:block ${!isLeft ? "pl-14" : ""}`}>
                    {!isLeft && (
                      <PrivacyCard
                        title={section.title}
                        content={section.content}
                        index={index}
                        direction="right"
                      />
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden">
                    <PrivacyCard
                      title={section.title}
                      content={section.content}
                      index={index}
                      direction="mobile"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Privacy Note */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl bg-[#18181B] p-7 text-center shadow-lg dark:bg-[#27272A]"
        >
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#15803D] text-lg font-bold text-white dark:bg-[#22C55E] dark:text-[#18181B]">
            ✓
          </div>

          <h3 className="mt-4 text-lg font-semibold text-white dark:text-[#F4F4F5]">
            Your Privacy Matters
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#A1A1AA]">
            We are committed to handling your information responsibly and
            keeping your experience on HandyHub safe and secure.
          </p>
        </motion.div>
      </div>
    </main>
  );
}

/* Privacy Card */
function PrivacyCard({
  title,
  content,
  index,
  direction,
}: {
  title: string;
  content: string;
  index: number;
  direction: "left" | "right" | "mobile";
}) {
  const animation =
    direction === "left"
      ? { x: -35, opacity: 0 }
      : direction === "right"
        ? { x: 35, opacity: 0 }
        : { y: 20, opacity: 0 };

  return (
    <motion.section
      initial={animation}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#27272A]"
    >
      {/* Number */}
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#15803D] text-sm font-bold text-white transition-colors group-hover:bg-[#15803D]/80 dark:bg-[#22C55E] dark:text-[#18181B] dark:group-hover:bg-[#22C55E]/80">
        {index + 1}
      </div>

      <h2 className="text-xl font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
        {title}
      </h2>

      <p className="mt-3 leading-7 text-[#1C1917]/70 dark:text-[#A1A1AA]">
        {content}
      </p>
    </motion.section>
  );
}
