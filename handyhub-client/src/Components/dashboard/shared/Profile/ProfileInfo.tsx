import { Mail, Pencil, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@heroui/react";

interface ProfileInfoProps {
    user: {
        name?: string | null;
        email?: string | null;
    };
    onEdit: () => void;
}

const ProfileInfo = ({ user, onEdit }: ProfileInfoProps) => {
    return (
        <div className="w-full">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-semibold text-[#111827] dark:text-[#F4F4F5]">
                            {user.name || "User"}
                        </h2>

                        <span className="rounded-full bg-[#15803D]/10 px-2.5 py-1 text-[11px] font-medium text-[#15803D] dark:bg-[#22C55E]/10 dark:text-[#22C55E]">
                            Customer
                        </span>
                    </div>

                    <p className="mt-1 text-sm text-[#6B7280] dark:text-[#A1A1AA]">
                        HandyHub account
                    </p>
                </div>

                <Button
                    onPress={onEdit}
                    variant="secondary"
                    className="
                    border border-[#15803D]/20
                    text-[#15803D]
                    hover:bg-[#15803D]/10
                    dark:border-[#22C55E]/20
                    dark:text-[#22C55E]
                    dark:hover:bg-[#22C55E]/10
                "
                >
                    <Pencil size={15} />
                    Edit Profile
                </Button>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div
                    className="
                        rounded-2xl border border-black/[0.06]
                        bg-[#FAFAF9] p-4
                        dark:border-white/[0.06]
                        dark:bg-[#18181B]
                    "
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                flex h-10 w-10 shrink-0 items-center justify-center
                                rounded-xl bg-[#15803D]/10
                                text-[#15803D]
                                dark:bg-[#22C55E]/10
                                dark:text-[#22C55E]
                            "
                        >
                            <Mail size={18} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-medium text-[#6B7280] dark:text-[#A1A1AA]">
                                Email Address
                            </p>

                            <p className="mt-1 truncate text-sm font-medium text-[#111827] dark:text-[#F4F4F5]">
                                {user.email || "Not available"}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="
                        rounded-2xl border border-black/[0.06]
                        bg-[#FAFAF9] p-4
                        dark:border-white/[0.06]
                        dark:bg-[#18181B]
                    "
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                flex h-10 w-10 shrink-0 items-center justify-center
                                rounded-xl bg-[#15803D]/10
                                text-[#15803D]
                                dark:bg-[#22C55E]/10
                                dark:text-[#22C55E]
                            "
                        >
                            <ShieldCheck size={18} />
                        </div>

                        <div>
                            <p className="text-xs font-medium text-[#6B7280] dark:text-[#A1A1AA]">
                                Account Type
                            </p>

                            <p className="mt-1 text-sm font-medium text-[#111827] dark:text-[#F4F4F5]">
                                Customer Account
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 border-t border-black/[0.06] pt-5 dark:border-white/[0.06]">
                <div className="flex items-center gap-2 text-sm font-medium text-[#111827] dark:text-[#F4F4F5]">
                    <UserRound size={16} />
                    Personal Information
                </div>

                <p className="mt-1 text-xs text-[#6B7280] dark:text-[#A1A1AA]">
                    Keep your HandyHub profile information up to date.
                </p>
            </div>
        </div>
    );
};

export default ProfileInfo;