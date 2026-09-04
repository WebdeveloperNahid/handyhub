import { ObjectId } from "mongodb";
import { bookingCollection, serviceCollection } from "../config/db";

export class ProviderService {
  static async getProviderServices(providerId: string) {
    return await serviceCollection.find({ providerId }).toArray();
  }

  static async addService(providerId: string, serviceData: Record<string, unknown>) {
    return await serviceCollection.insertOne({
      ...serviceData,
      providerId,
      status: "active",
      createdAt: new Date(),
    });
  }

  static async getAssignedBookings(providerId: string) {
    return await bookingCollection.find({ providerId }).toArray();
  }

  static async updateBookingStatus(bookingId: string, status: string) {
    return await bookingCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status, updatedAt: new Date() } }
    );
  }
}
