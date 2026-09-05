import { Router } from "express";
import { ProviderController } from "../controllers/provider.controller";
import { verifyProvider, verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.use(verifyToken, verifyProvider);

router.get("/services", ProviderController.getMyServices);
router.post("/services", ProviderController.createService);
router.get("/bookings", ProviderController.getAssignedBookings);
router.patch("/bookings/:bookingId/status", ProviderController.updateBookingStatus);

export default router;
