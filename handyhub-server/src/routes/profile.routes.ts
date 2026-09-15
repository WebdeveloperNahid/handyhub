import { Router } from "express";
import { updateUserProfile } from "../controllers/profile.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.patch(
    "/:id",
    // verifyToken,
    updateUserProfile
);

export default router;