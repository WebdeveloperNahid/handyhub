import { Router } from "express";

import {
    verifyToken,
    verifyCustomer,
} from "../middleware/auth.middleware";

import { CustomerBookingController } from "../controllers/customerBooking.controller";

const router = Router();

// Only authenticated customers/users can access booking routes
router.use(verifyToken, verifyCustomer);

// Create booking
router.post(
    "/bookings",
    CustomerBookingController.createBooking,
);

// Get my bookings
router.get(
    "/bookings",
    CustomerBookingController.getMyBookings,
);

// Get single booking
router.get(
    "/bookings/:bookingId",
    CustomerBookingController.getBookingById,
);

// Cancel booking
router.patch(
    "/bookings/:bookingId/cancel",
    CustomerBookingController.cancelBooking,
);

export default router;