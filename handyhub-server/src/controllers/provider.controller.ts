/**
 * @file provider.controller.ts
 * @description HTTP Controller for Provider API endpoints.
 * Handles request validation, delegates business logic to ProviderService,
 * and formats standardized JSON response envelopes.
 */

import { Request, Response } from "express";
import { ProviderService } from "../services/provider.service";
import { ServiceAvailability } from "../types";

/**
 * Standard error response handler helper.
 */
const handleError = (res: Response, error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "code" in error &&
    "message" in error
  ) {
    const customErr = error as { status: number; code: string; message: string };
    return res.status(customErr.status).json({
      success: false,
      error: {
        code: customErr.code,
        message: customErr.message,
      },
    });
  }

  const message = error instanceof Error ? error.message : "Internal server error";
  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message,
    },
  });
};

export class ProviderController {
  /**
   * GET /api/v1/provider/services OR /api/services/mine
   * Lists all services created by the authenticated provider.
   */
  static async getMyServices(req: Request, res: Response) {
    try {
      const providerId = req.user?._id?.toString();
      if (!providerId) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "Unauthorized access" },
        });
      }

      const services = await ProviderService.getProviderServices(providerId);
      return res.status(200).json({ success: true, data: services });
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * GET /api/v1/provider/services/:serviceId OR /api/services/:id
   * Retrieves single service details.
   */
  static async getServiceById(req: Request, res: Response) {
    try {
      const rawServiceId = req.params.serviceId || req.params.id;
      const serviceId = Array.isArray(rawServiceId) ? rawServiceId[0] : rawServiceId;

      if (!serviceId) {
        return res.status(400).json({
          success: false,
          error: { code: "INVALID_REQUEST", message: "Service ID is required" },
        });
      }

      const service = await ProviderService.getServiceById(serviceId);
      if (!service) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Service not found" },
        });
      }

      return res.status(200).json({ success: true, data: service });
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * POST /api/v1/provider/services OR /api/services
   * Creates a new service under the provider's account.
   */
  static async createService(req: Request, res: Response) {
    try {
      const providerId = req.user?._id?.toString();
      if (!providerId) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "Unauthorized access" },
        });
      }

      const created = await ProviderService.addService(providerId, req.body);
      return res.status(201).json({ success: true, data: created });
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * PUT /api/v1/provider/services/:serviceId OR PUT /api/services/:id
   * Updates an existing service owned by the authenticated provider.
   */
  static async updateService(req: Request, res: Response) {
    try {
      const providerId = req.user?._id?.toString();
      if (!providerId) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "Unauthorized access" },
        });
      }

      const rawServiceId = req.params.serviceId || req.params.id;
      const serviceId = Array.isArray(rawServiceId) ? rawServiceId[0] : rawServiceId;

      if (!serviceId) {
        return res.status(400).json({
          success: false,
          error: { code: "INVALID_REQUEST", message: "Service ID is required" },
        });
      }

      const updated = await ProviderService.updateService(providerId, serviceId, req.body);
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * DELETE /api/v1/provider/services/:serviceId OR DELETE /api/services/:id
   * Deletes a service owned by the provider.
   */
  static async deleteService(req: Request, res: Response) {
    try {
      const providerId = req.user?._id?.toString();
      if (!providerId) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "Unauthorized access" },
        });
      }

      const rawServiceId = req.params.serviceId || req.params.id;
      const serviceId = Array.isArray(rawServiceId) ? rawServiceId[0] : rawServiceId;

      if (!serviceId) {
        return res.status(400).json({
          success: false,
          error: { code: "INVALID_REQUEST", message: "Service ID is required" },
        });
      }

      const deleted = await ProviderService.deleteService(providerId, serviceId);
      return res.status(200).json({
        success: true,
        data: { message: "Service deleted successfully", deleted },
      });
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * PUT /api/v1/provider/services/:serviceId/availability OR PUT /api/services/:id/availability
   * Updates availability settings for a service.
   */
  static async updateServiceAvailability(req: Request, res: Response) {
    try {
      const providerId = req.user?._id?.toString();
      if (!providerId) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "Unauthorized access" },
        });
      }

      const rawServiceId = req.params.serviceId || req.params.id;
      const serviceId = Array.isArray(rawServiceId) ? rawServiceId[0] : rawServiceId;

      if (!serviceId) {
        return res.status(400).json({
          success: false,
          error: { code: "INVALID_REQUEST", message: "Service ID is required" },
        });
      }

      const updated = await ProviderService.updateServiceAvailability(
        providerId,
        serviceId,
        req.body as ServiceAvailability
      );
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * GET /api/v1/provider/bookings OR /api/bookings/provider
   * Lists bookings assigned to the provider with optional status filter.
   */
  static async getAssignedBookings(req: Request, res: Response) {
    try {
      const providerId = req.user?._id?.toString();
      if (!providerId) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "Unauthorized access" },
        });
      }

      const status = req.query.status as string | undefined;
      const bookings = await ProviderService.getAssignedBookings(providerId, status);
      return res.status(200).json({ success: true, data: bookings });
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * PATCH /api/v1/provider/bookings/:bookingId/status OR PATCH /api/bookings/:id/status
   * Updates booking status via strict state machine.
   */
  static async updateBookingStatus(req: Request, res: Response) {
    try {
      const providerId = req.user?._id?.toString();
      if (!providerId) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "Unauthorized access" },
        });
      }

      const rawBookingId = req.params.bookingId || req.params.id;
      const bookingId = Array.isArray(rawBookingId) ? rawBookingId[0] : rawBookingId;
      const { status } = req.body;

      if (!bookingId || !status) {
        return res.status(400).json({
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Both booking ID and target status are required",
          },
        });
      }

      const updated = await ProviderService.updateBookingStatus(providerId, bookingId, status);
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * GET /api/v1/provider/stats
   * Retrieves provider overview dashboard metrics.
   */
  static async getProviderStats(req: Request, res: Response) {
    try {
      const providerId = req.user?._id?.toString();
      if (!providerId) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "Unauthorized access" },
        });
      }

      const stats = await ProviderService.getProviderStats(providerId);
      return res.status(200).json({ success: true, data: stats });
    } catch (error) {
      return handleError(res, error);
    }
  }
}

