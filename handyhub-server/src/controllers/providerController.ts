import { Request, Response } from "express";
import { ProviderService } from "../services/providerService";

// Custom Request Interface
export interface AuthenticatedRequest extends Request {
  user?: {
    id?: string;
    _id?: string;
  };
}

export class ProviderController {
  // GET /api/provider/services
  static async getMyServices(req: AuthenticatedRequest, res: Response) {
    try {
      const providerId = req.user?.id || req.user?._id;
      if (!providerId) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      const services = await ProviderService.getProviderServices(
        String(providerId),
      );
      return res.status(200).json(services);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch services", error });
    }
  }

  // POST /api/provider/services
  static async createService(req: AuthenticatedRequest, res: Response) {
    try {
      const providerId = req.user?.id || req.user?._id;
      if (!providerId) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      const result = await ProviderService.addService(
        String(providerId),
        req.body,
      );
      return res.status(201).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create service", error });
    }
  }

  // PATCH /api/provider/services/:serviceId
  static async updateService(req: AuthenticatedRequest, res: Response) {
    try {
      const providerId = req.user?.id || req.user?._id;
      const rawServiceId = req.params.serviceId;

      const serviceId: string = Array.isArray(rawServiceId)
        ? rawServiceId[0]
        : (rawServiceId as string);

      if (!providerId) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      if (!serviceId) {
        return res.status(400).json({ message: "Service ID is required" });
      }

      const updatedService = await ProviderService.updateService(
        String(providerId),
        serviceId,
        req.body,
      );

      if (!updatedService) {
        return res
          .status(404)
          .json({ message: "Service not found or unauthorized" });
      }

      return res.status(200).json(updatedService);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to update service",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  // DELETE /api/provider/services/:serviceId
  static async deleteService(req: AuthenticatedRequest, res: Response) {
    try {
      const providerId = req.user?.id || req.user?._id;
      const rawServiceId = req.params.serviceId;

      const serviceId: string = Array.isArray(rawServiceId)
        ? rawServiceId[0]
        : (rawServiceId as string);

      if (!providerId) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      if (!serviceId) {
        return res.status(400).json({ message: "Service ID is required" });
      }

      const result = await ProviderService.deleteService(
        String(providerId),
        serviceId,
      );

      if (!result || result.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "Service not found or unauthorized" });
      }

      return res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete service",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  // GET /api/provider/bookings
  static async getAssignedBookings(req: AuthenticatedRequest, res: Response) {
    try {
      const providerId = req.user?.id || req.user?._id;
      if (!providerId) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      const bookings = await ProviderService.getAssignedBookings(
        String(providerId),
      );
      return res.status(200).json(bookings);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch bookings", error });
    }
  }

  // PATCH /api/provider/bookings/:bookingId/status
  static async updateBookingStatus(req: Request, res: Response) {
    try {
      const rawBookingId = req.params.bookingId;
      const bookingId: string = Array.isArray(rawBookingId)
        ? rawBookingId[0]
        : (rawBookingId as string);

      const { status } = req.body;

      if (!bookingId) {
        return res.status(400).json({ message: "Booking ID is required" });
      }

      const result = await ProviderService.updateBookingStatus(
        bookingId,
        String(status),
      );
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to update booking status", error });
    }
  }
}
