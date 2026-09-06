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

  static async getAllBookings(req: Request, res: Response) {
    try {
      const bookings = await AdminService.getAllBookings();
      return res.status(200).json({ success: true, data: bookings });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch all bookings", error });
    }
  }
}
