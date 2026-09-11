"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using HandyHub, you agree to follow these Terms & Conditions and all applicable rules and policies.",
  },
  {
    title: "2. Using HandyHub",
    content:
      "HandyHub provides a platform where customers can discover local services and connect with service providers. Users are expected to provide accurate information and use the platform responsibly.",
  },
  {
    title: "3. Customer Responsibilities",
    content:
      "Customers are responsible for providing accurate booking information and communicating respectfully with service providers.",
  },
  {
    title: "4. Provider Responsibilities",
    content:
      "Service providers are responsible for maintaining accurate service information, availability, pricing, and professional communication with customers.",
  },
  {
    title: "5. Changes to Terms",
    content:
      "HandyHub may update these terms when necessary. Continued use of the platform after changes means you accept the updated terms.",
  },
];

export default function TermsPage() {
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
          <span className="inline-block rounded-full bg-[#15803D]/10 px-4 py-2 text-sm font-semibold text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
            HandyHub Policies
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Terms & Conditions
          </h1>

          <p className="mt-3 text-sm text-[#1C1917]/60 dark:text-[#A1A1AA]">
            Last updated: September 2026
          </p>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#1C1917]/70 dark:text-[#A1A1AA]">
            Please read these terms carefully before using HandyHub. They
            explain your responsibilities and the rules for using our platform.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-black/10 dark:bg-white/10 md:block" />

          <div className="space-y-12 md:space-y-20">
            {sections.map((section, index) => {
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
                        duration: 0.4,
                        delay: 0.15,
                      }}
                      className="h-4 w-4 rounded-full border-4 border-[#FAF9F7] bg-[#15803D] shadow-md dark:border-[#18181B] dark:bg-[#22C55E]"
                    />
                  </div>

                  {/* Connector Line */}
                  <div
                    className={`absolute top-10 hidden h-px w-10 bg-black/10 dark:bg-white/10 md:block ${
                      isLeft ? "right-0 translate-x-0" : "left-0 -translate-x-0"
                    }`}
                  />

                  {/* Left Side */}
                  <div className={`hidden md:block ${isLeft ? "pr-14" : ""}`}>
                    {isLeft && (
                      <TimelineCard
                        section={section}
                        direction="left"
                        index={index}
                      />
                    )}
                  </div>

                  {/* Right Side */}
                  <div className={`hidden md:block ${!isLeft ? "pl-14" : ""}`}>
                    {!isLeft && (
                      <TimelineCard
                        section={section}
                        direction="right"
                        index={index}
                      />
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden">
                    <TimelineCard
                      section={section}
                      direction="mobile"
                      index={index}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl bg-[#18181B] p-6 text-center shadow-lg dark:bg-[#27272A]"
        >
          <h3 className="text-lg font-semibold text-[#F4F4F5]">Need Help?</h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#A1A1AA]">
            If you have any questions about these Terms & Conditions, please
            contact the HandyHub support team.
          </p>
        </motion.div>
      </div>
    </main>
  );
}

/* Timeline Card */
function TimelineCard({
  section,
  direction,
  index,
}: {
  section: {
    title: string;
    content: string;
  };
  direction: "left" | "right" | "mobile";
  index: number;
}) {
  const animation =
    direction === "left"
      ? { x: -60, opacity: 0 }
      : direction === "right"
        ? { x: 60, opacity: 0 }
        : { y: 30, opacity: 0 };

  return (
    <motion.section
      initial={animation}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#27272A]"
    >
      {/* Small Number */}
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#15803D] text-sm font-bold text-white transition-colors dark:bg-[#22C55E] dark:text-[#18181B]">
        {index + 1}
      </div>

      <h2 className="text-xl font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
        {section.title.replace(/^\d+\.\s*/, "")}
      </h2>

      <p className="mt-3 leading-7 text-[#1C1917]/70 dark:text-[#A1A1AA]">
        {section.content}
      </p>
    </motion.section>
  );
}
