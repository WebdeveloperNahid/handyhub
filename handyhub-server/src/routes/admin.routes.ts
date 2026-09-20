import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { verifyAdmin, verifyToken } from "../middleware/auth.middleware";

const router = Router();

// GET all users from handyhub_db.user
router.get("/users", AdminController.getAllUsers);

// Protected admin routes
router.patch("/users/:userId/role", verifyToken, verifyAdmin, AdminController.updateUserRole);
router.get("/services", verifyToken, verifyAdmin, AdminController.getAllServices);
router.get("/services/:id", verifyToken, verifyAdmin, AdminController.getServiceById);
router.patch("/services/:id", verifyToken, verifyAdmin, AdminController.updateService);
router.delete("/services/:id", verifyToken, verifyAdmin, AdminController.deleteService);
router.get("/bookings", verifyToken, verifyAdmin, AdminController.getAllBookings);

export default router;
