import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";
import { verifyCustomer, verifyToken } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/services", CustomerController.getServices);
router.get("/services/:id", CustomerController.getServiceById);

// Protected customer routes
router.post("/bookings", verifyToken, verifyCustomer, CustomerController.createBooking);
router.get("/bookings", verifyToken, verifyCustomer, CustomerController.getMyBookings);

export default router;
