"use client";

import { Camera, User } from "lucide-react";

interface ProfileAvatarProps {
    user: {
        name?: string | null;
        image?: string | null;
    };
    preview: string;
    isEditing: boolean;
    onImageChange: (file: File | null) => void;
    setPreview: (url: string) => void;
}

const ProfileAvatar = ({
    user,
    preview,
    isEditing,
    onImageChange,
    setPreview,
}: ProfileAvatarProps) => {
    const image = preview || user.image || "";

    const handleImageChange = (file: File) => {
        if (!file.type.startsWith("image/")) return;

        if (file.size > 5 * 1024 * 1024) return;

        onImageChange(file);
        setPreview(URL.createObjectURL(file));
    };

    return (
        <div className="flex shrink-0 flex-col items-center">
            <div className="relative">
                <div
                    className="
                        flex h-32 w-32 items-center justify-center
                        overflow-hidden rounded-full
                        bg-[#15803D]/10
                        text-[#15803D]
                        ring-4 ring-[#15803D]/10
                        dark:bg-[#22C55E]/10
                        dark:text-[#22C55E]
                        dark:ring-[#22C55E]/10
                    "
                >
                    {image ? (
                        <img
                            src={image}
                            alt={user.name || "Profile"}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <User size={48} strokeWidth={1.6} />
                    )}
                </div>

                {isEditing && (
                    <label
                        htmlFor="profile-image"
                        className="
                            absolute bottom-1 right-1
                            flex h-10 w-10 cursor-pointer
                            items-center justify-center
                            rounded-full
                            border-4 border-white
                            bg-[#15803D] text-white
                            shadow-md transition
                            hover:bg-[#166534]
                            dark:border-[#1D1D1F]
                            dark:bg-[#22C55E]
                            dark:text-[#18181B]
                            dark:hover:bg-[#16A34A]
                        "
                    >
                        <Camera size={17} />

                        <input
                            id="profile-image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                    handleImageChange(file);
                                }
                            }}
                        />
                    </label>
                )}
            </div>

            <p className="mt-3 text-xs text-[#6B7280] dark:text-[#A1A1AA]">
                {isEditing ? "Click camera to change photo" : "Profile Photo"}
            </p>
        </div>
    );
};

export default ProfileAvatar;