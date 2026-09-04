import { Request, Response } from "express";
import { ProviderService } from "../services/provider.service";

export class ProviderController {
  static async getMyServices(req: Request, res: Response) {
    try {
      const providerId = req.user?._id?.toString();
      if (!providerId) {
        return res.status(401).json({ message: "unauthorized access" });
      }
      const services = await ProviderService.getProviderServices(providerId);
      return res.status(200).json({ success: true, data: services });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch provider services", error });
    }
  }

  static async createService(req: Request, res: Response) {
    try {
      const providerId = req.user?._id?.toString();
      if (!providerId) {
        return res.status(401).json({ message: "unauthorized access" });
      }
      const result = await ProviderService.addService(providerId, req.body);
      return res.status(201).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ message: "Failed to add service", error });
    }
  }

  static async getAssignedBookings(req: Request, res: Response) {
    try {
      const providerId = req.user?._id?.toString();
      if (!providerId) {
        return res.status(401).json({ message: "unauthorized access" });
      }
      const bookings = await ProviderService.getAssignedBookings(providerId);
      return res.status(200).json({ success: true, data: bookings });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch assigned bookings", error });
    }
  }

  static async updateBookingStatus(req: Request, res: Response) {
    try {
      const bookingId = req.params.bookingId as string;
      const { status } = req.body;
      const result = await ProviderService.updateBookingStatus(bookingId, status);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update booking status", error });
    }
  }
}
