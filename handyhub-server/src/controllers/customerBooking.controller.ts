import { RequestHandler } from "express";
import {
    CustomerBookingService,
    CreateBookingData,
} from "../services/customerBookingServices";

interface UserRequest {
    user?: {
        id?: string;
        _id?: string;
        userId?: string;
    };
}

export class CustomerBookingController {

    static createBooking: RequestHandler = async (req, res) => {
        console.log("🔥 CUSTOMER CREATE BOOKING CONTROLLER HIT");
        try {
            const request = req as typeof req & UserRequest;

            const customerId =
                request.user?.id ||
                request.user?._id ||
                request.user?.userId;

            if (!customerId) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                });
                return;
            }

            const {
                serviceId,
                serviceName,
                serviceImage,
                serviceCategory,
                providerId,
                price,
                bookingDate,
                bookingTime,
                address,
            } = req.body;

            if (
                !serviceId ||
                !bookingDate ||
                !bookingTime ||
                !address
            ) {
                res.status(400).json({
                    success: false,
                    message:
                        "Service, date, time and address are required",
                });
                return;
            }

            const result =
                await CustomerBookingService.createBooking(
                    customerId,
                    {
                        serviceId,
                        bookingDate,
                        bookingTime,
                        address,
                    },
                );

            if (!result.success) {
                res.status(404).json(result);
                return;
            }

            res.status(201).json(result);
        } catch (error) {
            console.error("Create booking error:", error);

            res.status(500).json({
                success: false,
                message: "Failed to create booking",
            });
        }
    };

    static getMyBookings: RequestHandler = async (req, res) => {
        try {
            const request = req as typeof req & UserRequest;

            const customerId =
                request.user?.id ||
                request.user?._id ||
                request.user?.userId;

            if (!customerId) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                });
                return;
            }

            const bookings =
                await CustomerBookingService.getCustomerBookings(
                    customerId,
                );

            res.status(200).json({
                success: true,
                data: bookings,
            });
        } catch (error) {
            console.error("Get bookings error:", error);

            res.status(500).json({
                success: false,
                message: "Failed to fetch bookings",
            });
        }
    };

    static getBookingById: RequestHandler = async (req, res) => {
        try {
            const request = req as typeof req & UserRequest;

            const customerId =
                request.user?.id ||
                request.user?._id ||
                request.user?.userId;

            const bookingId = String(req.params.bookingId);

            if (!customerId) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                });
                return;
            }

            const booking =
                await CustomerBookingService.getCustomerBooking(
                    customerId,
                    bookingId,
                );

            if (!booking) {
                res.status(404).json({
                    success: false,
                    message: "Booking not found",
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: booking,
            });
        } catch (error) {
            console.error("Get booking error:", error);

            res.status(500).json({
                success: false,
                message: "Failed to fetch booking",
            });
        }
    };

    static cancelBooking: RequestHandler = async (req, res) => {
        try {
            const request = req as typeof req & UserRequest;

            const customerId =
                request.user?.id ||
                request.user?._id ||
                request.user?.userId;

            const bookingId = String(req.params.bookingId);

            if (!customerId) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                });
                return;
            }

            const result =
                await CustomerBookingService.cancelBooking(
                    customerId,
                    bookingId,
                );

            if (
                !result ||
                result.matchedCount === 0
            ) {
                res.status(404).json({
                    success: false,
                    message:
                        "Booking not found or cannot be cancelled",
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Booking cancelled successfully",
            });
        } catch (error) {
            console.error("Cancel booking error:", error);

            res.status(500).json({
                success: false,
                message: "Failed to cancel booking",
            });
        }
    };
}