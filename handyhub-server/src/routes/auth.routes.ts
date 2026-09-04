import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", verifyToken, AuthController.getMe);
router.post("/logout", verifyToken, AuthController.logout);

export default router;
