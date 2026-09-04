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
    <main className="min-h-screen bg-white px-4 py-16 text-[#291C0E] transition-colors duration-300 dark:bg-[#1F1712] dark:text-[#E1D4C2] sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-[#E1D4C2] px-4 py-2 text-sm font-medium text-[#6E473B] dark:bg-[#382820] dark:text-[#C5B8AA]">
            HandyHub Policies
          </span>

          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            Terms & Conditions
          </h1>

          <p className="mt-3 text-sm text-[#6E473B] dark:text-[#A78D78]">
            Last updated: September 2026
          </p>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#6E473B] dark:text-[#C5B8AA]">
            Please read these terms carefully before using HandyHub. They
            explain your responsibilities and the rules for using our platform.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">

          {/* Center Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#A78D78]/50 md:block" />

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
                      className="h-4 w-4 rounded-full border-4 border-white bg-[#6E473B] shadow-md dark:border-[#1F1712] dark:bg-[#A78D78]"
                    />
                  </div>

                  {/* Connector Line */}
                  <div
                    className={`absolute top-10 hidden h-px w-10 bg-[#A78D78]/50 md:block ${
                      isLeft
                        ? "right-0 translate-x-0"
                        : "left-0 -translate-x-0"
                    }`}
                  />

                  {/* Left Side */}
                  <div
                    className={`hidden md:block ${
                      isLeft ? "pr-14" : ""
                    }`}
                  >
                    {isLeft && (
                      <TimelineCard
                        section={section}
                        direction="left"
                        index={index}
                      />
                    )}
                  </div>

                  {/* Right Side */}
                  <div
                    className={`hidden md:block ${
                      !isLeft ? "pl-14" : ""
                    }`}
                  >
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
          className="mt-16 rounded-2xl bg-[#291C0E] p-6 text-center shadow-lg dark:bg-[#382820]"
        >
          <h3 className="text-lg font-semibold text-[#E1D4C2]">
            Need Help?
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#BEB5A9]">
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
      className="group rounded-2xl border border-[#BEB5A9]/40 bg-[#E1D4C2]/40 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#A78D78]/20 dark:bg-[#2D211A]"
    >
      {/* Small Number */}
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#6E473B] text-sm font-bold text-[#E1D4C2] transition-colors group-hover:bg-[#A78D78] group-hover:text-[#291C0E] dark:bg-[#A78D78] dark:text-[#291C0E]">
        {index + 1}
      </div>

      <h2 className="text-xl font-semibold text-[#291C0E] dark:text-[#E1D4C2]">
        {section.title.replace(/^\d+\.\s*/, "")}
      </h2>

      <p className="mt-3 leading-7 text-[#6E473B] dark:text-[#C5B8AA]">
        {section.content}
      </p>
    </motion.section>
  );
}