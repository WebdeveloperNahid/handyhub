import { ObjectId } from "mongodb";
import { bookingCollection, serviceCollection } from "../config/db";

export class ProviderService {
  // 1. Get Provider Services
  static async getProviderServices(providerId: string) {
    return await serviceCollection.find({ providerId }).toArray();
  }

  // 2. Add Service
  static async addService(
    providerId: string,
    serviceData: Record<string, unknown>,
  ) {
    return await serviceCollection.insertOne({
      ...serviceData,
      providerId,
      status: "active",
      createdAt: new Date(),
    });
  }

  // 3. Get Service By ID
  static async getServiceById(providerId: string, serviceId: string) {
    if (!ObjectId.isValid(serviceId)) return null;
    return await serviceCollection.findOne({
      _id: new ObjectId(serviceId),
      providerId,
    });
  }

  // 4. Update Service
  static async updateService(
    providerId: string,
    serviceId: string,
    updateData: Record<string, unknown>,
  ) {
    if (!ObjectId.isValid(serviceId)) return null;

    const { _id, providerId: _pid, createdAt, ...safeData } = updateData;

    return await serviceCollection.findOneAndUpdate(
      { _id: new ObjectId(serviceId), providerId },
      { $set: { ...safeData, updatedAt: new Date() } },
      { returnDocument: "after" },
    );
  }

  // 5. Delete Service
  static async deleteService(providerId: string, serviceId: string) {
    if (!ObjectId.isValid(serviceId)) return { deletedCount: 0 };

    return await serviceCollection.deleteOne({
      _id: new ObjectId(serviceId),
      providerId,
    });
  }

  // 6. Get Assigned Bookings
  static async getAssignedBookings(providerId: string) {
    return await bookingCollection.find({ providerId }).toArray();
  }

  // 7. Update Booking Status
  static async updateBookingStatus(bookingId: string, status: string) {
    if (!ObjectId.isValid(bookingId)) return null;

    return await bookingCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status, updatedAt: new Date() } },
    );
  }
}
