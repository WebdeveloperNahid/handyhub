import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { verifyAdmin, verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.use(verifyToken, verifyAdmin);

router.get("/users", AdminController.getAllUsers);
router.patch("/users/:userId/role", AdminController.updateUserRole);
router.get("/services", AdminController.getAllServices);
router.get("/bookings", AdminController.getAllBookings);

export default router;
