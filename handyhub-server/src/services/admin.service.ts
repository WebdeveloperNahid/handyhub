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

  static async getAllBookings() {
    return await bookingCollection.find({}).toArray();
  }
}
