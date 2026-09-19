"use client";

import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";

const ProfileActivity = () => {
    const { data: session, isPending } = useSession();

    const user = session?.user;
    return (
        <div>
            {/* Account Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="mt-6"
            >
                <div
                    className="
                        overflow-hidden rounded-3xl
                        border border-black/[0.06]
                        bg-white shadow-sm
                        dark:border-white/[0.06]
                        dark:bg-[#1D1D1F]
                    "
                >
                    {/* Header */}
                    <div className="border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06] md:px-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#15803D]/10 dark:bg-[#22C55E]/10">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-[#15803D] dark:text-[#22C55E]"
                                >
                                    <circle cx="12" cy="12" r="9" />
                                    <polyline points="12 7 12 12 15 14" />
                                </svg>
                            </div>

                            <div>
                                <h2 className="text-base font-semibold text-[#111827] dark:text-[#F4F4F5]">
                                    Account Activity
                                </h2>

                                <p className="mt-0.5 text-sm text-[#6B7280] dark:text-[#A1A1AA]">
                                    Your recent account information
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Activity Items */}
                    <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
                        {/* Member Since */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.25 }}
                            className="
                                rounded-2xl
                                border border-black/[0.05]
                                bg-[#FAFAF9]
                                p-5
                                dark:border-white/[0.05]
                                dark:bg-[#18181B]
                            "
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-[#78716C] dark:text-[#A1A1AA]">
                                        Member Since
                                    </p>

                                    <p className="mt-2 text-base font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                                        {user?.createdAt
                                            ? new Date(user?.createdAt).toLocaleDateString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                }
                                            )
                                            : "Not available"}
                                    </p>
                                </div>

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#15803D]/10 dark:bg-[#22C55E]/10">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-[#15803D] dark:text-[#22C55E]"
                                    >
                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                </div>
                            </div>

                            <p className="mt-3 text-xs text-[#A8A29E] dark:text-[#71717A]">
                                When your HandyHub account was created
                            </p>
                        </motion.div>

                        {/* Profile Updated */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.35 }}
                            className="
                                rounded-2xl
                                border border-black/[0.05]
                                bg-[#FAFAF9]
                                p-5
                                dark:border-white/[0.05]
                                dark:bg-[#18181B]
                            "
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-[#78716C] dark:text-[#A1A1AA]">
                                        Profile Updated
                                    </p>

                                    <p className="mt-2 text-base font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                                        {user?.updatedAt
                                            ? new Date(user?.updatedAt).toLocaleDateString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                }
                                            )
                                            : "Not available"}
                                    </p>
                                </div>

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#15803D]/10 dark:bg-[#22C55E]/10">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-[#15803D] dark:text-[#22C55E]"
                                    >
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                                    </svg>
                                </div>
                            </div>

                            <p className="mt-3 text-xs text-[#A8A29E] dark:text-[#71717A]">
                                Last time your profile information changed
                            </p>
                        </motion.div>

                        {/* Account Status */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.45 }}
                            className="
                                rounded-2xl
                                border border-black/[0.05]
                                bg-[#FAFAF9]
                                p-5
                                dark:border-white/[0.05]
                                dark:bg-[#18181B]
                            "
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-[#78716C] dark:text-[#A1A1AA]">
                                        Account Status
                                    </p>

                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />

                                        <p className="text-base font-semibold text-[#1C1917] dark:text-[#F4F4F5]">
                                            Active
                                        </p>
                                    </div>
                                </div>

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#15803D]/10 dark:bg-[#22C55E]/10">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-[#15803D] dark:text-[#22C55E]"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                </div>
                            </div>

                            <p className="mt-3 text-xs text-[#A8A29E] dark:text-[#71717A]">
                                Your account is currently available
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default ProfileActivity
