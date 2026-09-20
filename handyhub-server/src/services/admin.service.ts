import { ObjectId } from "mongodb";
import { bookingCollection, serviceCollection, userCollection } from "../config/db";

export class AdminService {
  static async getAllUsers() {
    return await userCollection.find({}).toArray();
  }

  static async updateUserRole(userId: string, role: string) {
    return await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role, updatedAt: new Date() } }
    );
  }

  static async getAllServices() {
    return await serviceCollection.find({}).toArray();
  }

  static async getServiceById(serviceId: string) {
    return await serviceCollection.findOne({ _id: new ObjectId(serviceId) });
  }

  static async updateService(serviceId: string, updateData: Record<string, unknown>) {
    return await serviceCollection.updateOne(
      { _id: new ObjectId(serviceId) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
  }

  static async deleteService(serviceId: string) {
    return await serviceCollection.deleteOne({ _id: new ObjectId(serviceId) });
  }

  static async getAllBookings() {
    return await bookingCollection.find({}).toArray();
  }
}
