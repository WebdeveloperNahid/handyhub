"use client";

import { Button } from "@heroui/react";

interface ProfileEditFormProps {
    name: string;
    setName: (value: string) => void;
    isSaving: boolean;
    onSave: () => void;
    onCancel: () => void;
}

const ProfileEditForm = ({
    name,
    setName,
    isSaving,
    onSave,
    onCancel,
}: ProfileEditFormProps) => {
    return (
        <div className="w-full space-y-5">
            <div className="space-y-2">
                <label
                    htmlFor="full-name"
                    className="text-sm font-medium text-[#111827] dark:text-[#F4F4F5]"
                >
                    Full Name
                </label>

                <input
                    id="full-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                        w-full rounded-xl border border-black/[0.08]
                        bg-white px-4 py-3 text-sm outline-none
                        transition
                        focus:border-[#15803D]
                        dark:border-white/[0.08]
                        dark:bg-[#18181B]
                        dark:text-[#F4F4F5]
                        dark:focus:border-[#22C55E]
                    "
                />
            </div>

            <div className="flex justify-end gap-3">
                <Button
                    variant="secondary"
                    onPress={onCancel}
                    isDisabled={isSaving}
                    className="
                    border border-[#15803D]/20
                    bg-white
                    text-[#15803D]
                    hover:bg-[#15803D]/10

                    dark:border-[#22C55E]/20
                    dark:bg-[#1D1D1F]
                    dark:text-[#22C55E]
                    dark:hover:bg-[#22C55E]/10
                "
                >
                    Cancel
                </Button>

                <Button
                    variant="primary"
                    onPress={onSave}
                    isDisabled={isSaving}
                    className="
                    bg-[#15803D]
                    text-white
                    hover:bg-[#166534]
                    dark:bg-[#22C55E]
                    dark:text-[#18181B]
                    dark:hover:bg-[#16A34A]
                "
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    );
};

export default ProfileEditForm;