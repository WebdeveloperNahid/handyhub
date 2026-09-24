/**
 * @file provider.service.ts
 * @description Business logic layer for Provider operations: service CRUD, availability management,
 * booking lifecycle state machine enforcement, and performance statistics.
 */

import { ObjectId } from "mongodb";
import { bookingCollection, serviceCollection } from "../config/db";
import { IBooking, IService, ServiceAvailability } from "../types";

/**
 * Valid lifecycle transitions for bookings.
 * pending -> accepted, rejected, cancelled
 * accepted -> in-progress, cancelled
 * in-progress -> completed
 */
const VALID_BOOKING_TRANSITIONS: Record<string, string[]> = {
  pending: ["accepted", "rejected", "cancelled"],
  accepted: ["in-progress", "cancelled"],
  "in-progress": ["completed"],
  completed: [],
  rejected: [],
  cancelled: [],
};

export class ProviderService {
  static async getProviderServices(providerId: string): Promise<IService[]> {
    return (await serviceCollection
      .find({ providerId })
      .sort({ createdAt: -1 })
      .toArray()) as unknown as IService[];
  }

  static async getServiceById(
    serviceId: string,
    providerId?: string
  ): Promise<IService | null> {
    if (!ObjectId.isValid(serviceId)) {
      return null;
    }

    const query: Record<string, unknown> = { _id: new ObjectId(serviceId) };
    if (providerId) {
      query.providerId = providerId;
    }

    return (await serviceCollection.findOne(query)) as unknown as IService | null;
  }

  static async addService(
    providerId: string,
    serviceData: Partial<IService>
  ): Promise<IService> {
    const ALLOWED_CATEGORIES = [
      "Plumbing",
      "Electrical",
      "Cleaning",
      "Painting",
      "Home Repair",
      "Appliance Repair",
    ];

    const DEFAULT_SERVICE_IMAGE =
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80";

    const { title, description, category, price, image, availability, duration, highlights } =
      serviceData;

    if (!title || typeof title !== "string" || title.trim().length < 3) {
      throw { status: 400, code: "INVALID_TITLE", message: "Title must be at least 3 characters" };
    }

    if (!category || typeof category !== "string" || !ALLOWED_CATEGORIES.includes(category.trim())) {
      throw {
        status: 400,
        code: "INVALID_CATEGORY",
        message: `Category must be one of: ${ALLOWED_CATEGORIES.join(", ")}`,
      };
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      throw { status: 400, code: "INVALID_PRICE", message: "Price must be a positive number greater than 0" };
    }

    if (!description || typeof description !== "string" || description.trim().length < 10) {
      throw {
        status: 400,
        code: "INVALID_DESCRIPTION",
        message: "Description must be at least 10 characters long",
      };
    }

    const validatedAvailability: ServiceAvailability = {
      status:
        availability?.status === "busy" || availability?.status === "by-appointment"
          ? availability.status
          : "available",
      days:
        Array.isArray(availability?.days) && availability.days.length > 0
          ? availability.days
          : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      workingHours: {
        from: availability?.workingHours?.from || "09:00 AM",
        to: availability?.workingHours?.to || "06:00 PM",
      },
      instantBooking: availability?.instantBooking ?? true,
      responseTime: availability?.responseTime || "Under 1 hour",
    };

    const newDoc = {
      providerId,
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      price: numericPrice,
      image: (typeof image === "string" && image.trim().length > 0) ? image.trim() : DEFAULT_SERVICE_IMAGE,
      availability: validatedAvailability,
      duration: duration || "1 - 2 Hours",
      highlights: Array.isArray(highlights) ? highlights : [],
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await serviceCollection.insertOne(newDoc);
    return { _id: result.insertedId, ...newDoc } as unknown as IService;
  }

  static async updateService(
    providerId: string,
    serviceId: string,
    updateData: Partial<IService>
  ): Promise<IService> {
    if (!ObjectId.isValid(serviceId)) {
      throw { status: 400, code: "INVALID_ID", message: "Invalid service ID format" };
    }

    const existing = await serviceCollection.findOne({ _id: new ObjectId(serviceId) });
    if (!existing) {
      throw { status: 404, code: "NOT_FOUND", message: "Service not found" };
    }

    if (existing.providerId?.toString() !== providerId) {
      throw {
        status: 403,
        code: "FORBIDDEN",
        message: "You do not have permission to modify this service",
      };
    }

    const sanitizedData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (updateData.title !== undefined) sanitizedData.title = updateData.title.trim();
    if (updateData.description !== undefined) sanitizedData.description = updateData.description.trim();
    if (updateData.category !== undefined) sanitizedData.category = updateData.category.trim();
    if (updateData.price !== undefined) {
      const p = Number(updateData.price);
      if (Number.isNaN(p) || p <= 0) {
        throw { status: 400, code: "INVALID_PRICE", message: "Price must be greater than 0" };
      }
      sanitizedData.price = p;
    }
    if (updateData.image !== undefined) sanitizedData.image = updateData.image;
    if (updateData.availability !== undefined) sanitizedData.availability = updateData.availability;
    if (updateData.duration !== undefined) sanitizedData.duration = updateData.duration;
    if (updateData.highlights !== undefined) sanitizedData.highlights = updateData.highlights;
    if (updateData.status !== undefined) sanitizedData.status = updateData.status;

    await serviceCollection.updateOne(
      { _id: new ObjectId(serviceId), providerId },
      { $set: sanitizedData }
    );

    const updated = await serviceCollection.findOne({ _id: new ObjectId(serviceId) });
    return updated as unknown as IService;
  }

  static async deleteService(providerId: string, serviceId: string): Promise<boolean> {
    if (!ObjectId.isValid(serviceId)) {
      throw { status: 400, code: "INVALID_ID", message: "Invalid service ID format" };
    }

    const existing = await serviceCollection.findOne({ _id: new ObjectId(serviceId) });
    if (!existing) {
      throw { status: 404, code: "NOT_FOUND", message: "Service not found" };
    }

    if (existing.providerId?.toString() !== providerId) {
      throw {
        status: 403,
        code: "FORBIDDEN",
        message: "You do not have permission to delete this service",
      };
    }

    const result = await serviceCollection.deleteOne({
      _id: new ObjectId(serviceId),
      providerId,
    });

    return result.deletedCount === 1;
  }

  static async updateServiceAvailability(
    providerId: string,
    serviceId: string,
    availability: ServiceAvailability
  ): Promise<IService> {
    if (!ObjectId.isValid(serviceId)) {
      throw { status: 400, code: "INVALID_ID", message: "Invalid service ID format" };
    }

    const existing = await serviceCollection.findOne({ _id: new ObjectId(serviceId) });
    if (!existing) {
      throw { status: 404, code: "NOT_FOUND", message: "Service not found" };
    }

    if (existing.providerId?.toString() !== providerId) {
      throw {
        status: 403,
        code: "FORBIDDEN",
        message: "You do not have permission to update availability for this service",
      };
    }

    await serviceCollection.updateOne(
      { _id: new ObjectId(serviceId), providerId },
      { $set: { availability, updatedAt: new Date() } }
    );

    const updated = await serviceCollection.findOne({ _id: new ObjectId(serviceId) });
    return updated as unknown as IService;
  }

  /**
   * Lists bookings assigned to the authenticated provider, with optional status filtering.
   */
  static async getAssignedBookings(
    providerId: string,
    status?: string
  ): Promise<IBooking[]> {
    const query: Record<string, unknown> = { providerId };
    if (status && status !== "All" && status !== "all") {
      query.status = status.toLowerCase();
    }

    return (await bookingCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()) as unknown as IBooking[];
  }

  /**
   * Updates booking status while strictly enforcing the state machine lifecycle.
   * Lifecycle: pending -> accepted -> in-progress -> completed
   * Terminal branches: rejected / cancelled from pending / accepted.
   */
  static async updateBookingStatus(
    providerId: string,
    bookingId: string,
    targetStatus: string
  ): Promise<IBooking> {
    if (!ObjectId.isValid(bookingId)) {
      throw { status: 400, code: "INVALID_ID", message: "Invalid booking ID format" };
    }

    const booking = await bookingCollection.findOne({ _id: new ObjectId(bookingId) });
    if (!booking) {
      throw { status: 404, code: "NOT_FOUND", message: "Booking not found" };
    }

    if (booking.providerId?.toString() !== providerId) {
      throw {
        status: 403,
        code: "FORBIDDEN",
        message: "You do not have permission to manage this booking",
      };
    }

    const currentStatus = ((booking.status as string) || "pending").toLowerCase();
const normalizedTarget = targetStatus.toLowerCase().replace(/\s+/g, "-");    const allowedNext = VALID_BOOKING_TRANSITIONS[currentStatus] || [];

    if (!allowedNext.includes(normalizedTarget)) {
      throw {
        status: 400,
        code: "INVALID_STATUS_TRANSITION",
        message: `Cannot transition booking from '${currentStatus}' to '${normalizedTarget}'. Allowed transitions: ${allowedNext.length > 0 ? allowedNext.join(", ") : "None (terminal state)"
          }`,
      };
    }

    await bookingCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status: normalizedTarget, updatedAt: new Date() } }
    );

    const updated = await bookingCollection.findOne({ _id: new ObjectId(bookingId) });
    return updated as unknown as IBooking;
  }

  /**
   * Aggregates statistics for the provider's overview dashboard.
   */
  static async getProviderStats(providerId: string) {
    const services = await serviceCollection.find({ providerId }).toArray();
    const bookings = await bookingCollection.find({ providerId }).toArray();

    const totalServices = services.length;
    const activeServices = services.filter((s) => s.status === "active").length;
    const pendingBookings = bookings.filter((b) => b.status === "pending").length;
    const activeJobs = bookings.filter(
      (b) => b.status === "accepted" || b.status === "in-progress"
    ).length;
    const completedBookings = bookings.filter((b) => b.status === "completed").length;

    const estimatedRevenue = bookings
      .filter((b) => b.status === "completed")
      .reduce((sum, b) => sum + (Number(b.price) || 0), 0);

    return {
      totalServices,
      activeServices,
      pendingBookings,
      activeJobs,
      completedBookings,
      estimatedRevenue,
    };
  }
}