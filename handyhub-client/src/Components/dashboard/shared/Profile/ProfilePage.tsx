"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { imgUpload } from "@/lib/imageUpload";

import ProfileHeader from "./ProfileHeader";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfilePage() {
    const { data: session, isPending } = useSession();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [preview, setPreview] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted || isPending) {
        return (
            <main className="flex flex-1 items-center justify-center">
    <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#15803D]/10 dark:bg-[#22C55E]/10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#15803D]/20 border-t-[#15803D] dark:border-[#22C55E]/20 dark:border-t-[#22C55E]" />
        </div>

        <div className="text-center">
            <p className="text-sm font-semibold text-[#111827] dark:text-[#F4F4F5]">
                HandyHub
            </p>

            <p className="mt-1 text-xs text-[#6B7280] dark:text-[#A1A1AA]">
                Getting your profile ready...
            </p>
        </div>
    </div>
</main>
        );
    }

    if (!session) {
        return (
            <main className="flex flex-1 items-center justify-center">
                <p className="text-sm text-[#4B5563] dark:text-[#A1A1AA]">
                    Please login to view profile.
                </p>
            </main>
        );
    }

    const user = session.user;

    const handleEdit = () => {
        setName(user.name || "");
        setPreview(user.image || "");
        setImageFile(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setName(user.name || "");
        setPreview(user.image || "");
        setImageFile(null);
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setImageFile(file);

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
    };

    const handleSave = async () => {
        if (!name.trim()) {
            toast.error("Name cannot be empty");
            return;
        }

        try {
            setIsSaving(true);

            let uploadedUrl = user.image || "";

            if (imageFile) {
                const uploadedImage = await imgUpload(imageFile);

                uploadedUrl = uploadedImage?.url || "";

                if (!uploadedUrl) {
                    toast.error("Image upload failed");
                    return;
                }
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/profile/${user.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        image: uploadedUrl,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(
                    data.message || "Failed to update profile"
                );
                return;
            }

            toast.success("Profile updated successfully!");

            setIsEditing(false);
            setImageFile(null);

            window.location.reload();
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Something went wrong!");
        } finally {
            setIsSaving(false);
        }
    };

  return (
    <main className="flex-1 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-4xl">
            <ProfileHeader />

            <div
                className="
                    mt-8 overflow-hidden rounded-3xl
                    border border-black/[0.06]
                    bg-white shadow-sm
                    dark:border-white/[0.06]
                    dark:bg-[#1D1D1F]
                "
            >
                <div className="p-6 md:p-8">
                    <div className="flex flex-col gap-8 md:flex-row md:items-start">
                        <ProfileAvatar
                            user={user}
                            preview={preview}
                            isEditing={isEditing}
                            onImageChange={setImageFile}
                            setPreview={setPreview}
                        />

                        <div className="min-w-0 flex-1">
                            {isEditing ? (
                                <ProfileEditForm
                                    name={name}
                                    setName={setName}
                                    isSaving={isSaving}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                />
                            ) : (
                                <ProfileInfo
                                    user={user}
                                    onEdit={handleEdit}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
);
}
