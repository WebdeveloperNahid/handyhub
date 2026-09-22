import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";

export class AdminController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await AdminService.getAllUsers();
      return res.status(200).json({ success: true, data: users });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch users", error });
    }
  }

  static async updateUserRole(req: Request, res: Response) {
    try {
      const userId = req.params.userId as string;
      const { role } = req.body;
      const result = await AdminService.updateUserRole(userId, role);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update user role", error });
    }
  }

  static async getAllServices(req: Request, res: Response) {
    try {
      const services = await AdminService.getAllServices();
      return res.status(200).json({ success: true, data: services });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch all services", error });
    }
  }

  static async getServiceById(req: Request, res: Response) {
    try {
      const serviceId = req.params.id as string;
      const service = await AdminService.getServiceById(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      return res.status(200).json({ success: true, data: service });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch service details", error });
    }
  }

  static async updateService(req: Request, res: Response) {
    try {
      const serviceId = req.params.id as string;
      const result = await AdminService.updateService(serviceId, req.body);
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Service not found" });
      }
      return res.status(200).json({ success: true, message: "Service updated successfully", data: result });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update service", error });
    }
  }

  static async deleteService(req: Request, res: Response) {
    try {
      const serviceId = req.params.id as string;
      const result = await AdminService.deleteService(serviceId);
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Service not found" });
      }
      return res.status(200).json({ success: true, message: "Service deleted successfully", data: result });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete service", error });
    }
  }

  static async getAllBookings(req: Request, res: Response) {
    try {
      const bookings = await AdminService.getAllBookings();
      return res.status(200).json({ success: true, data: bookings });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch all bookings", error });
    }
  }

  static async getStats(req: Request, res: Response) {
    try {
      const stats = await AdminService.getAdminStats();
      return res.status(200).json({ success: true, data: stats });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch admin stats", error });
    }
  }
}
