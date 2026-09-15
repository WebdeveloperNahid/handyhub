import { Request, Response } from "express";
import { updateProfile } from "../services/profile.service";

export const updateUserProfile = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const { name, image } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        if (!name?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        const result = await updateProfile(
            id as string,
            name.trim(),
            image || ""
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.error("Update profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
};