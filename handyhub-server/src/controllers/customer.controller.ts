import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

export class CustomerController {
  static async getServices(req: Request, res: Response) {
    try {
      const services = await CustomerService.getAvailableServices();
      return res.status(200).json({ success: true, data: services });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch services", error });
    }
  }

  static async getServiceById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const service = await CustomerService.getServiceById(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      return res.status(200).json({ success: true, data: service });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching service", error });
    }
  }

}
