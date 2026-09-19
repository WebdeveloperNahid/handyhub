import { Router } from "express";
import { ProviderController } from "../controllers/provider.controller";
import { verifyProvider, verifyToken } from "../middleware/auth.middleware";

const router = Router();

// Protect all provider routes with token verification and provider role check
router.use(verifyToken, verifyProvider);

// Service Management
router.get("/services", ProviderController.getMyServices);
router.post("/services", ProviderController.createService);
router.get("/services/:serviceId", ProviderController.getServiceById);
router.put("/services/:serviceId", ProviderController.updateService);
router.patch("/services/:serviceId", ProviderController.updateService);
router.delete("/services/:serviceId", ProviderController.deleteService);
router.put("/services/:serviceId/availability", ProviderController.updateServiceAvailability);
router.patch("/services/:serviceId/availability", ProviderController.updateServiceAvailability);

// Booking Management
router.get("/bookings", ProviderController.getAssignedBookings);
router.patch("/bookings/:bookingId/status", ProviderController.updateBookingStatus);
router.put("/bookings/:bookingId/status", ProviderController.updateBookingStatus);

// Provider Dashboard Analytics
router.get("/stats", ProviderController.getProviderStats);

export default router;

