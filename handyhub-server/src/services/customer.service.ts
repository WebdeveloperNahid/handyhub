import { ObjectId } from "mongodb";
import { bookingCollection, serviceCollection } from "../config/db";

export class CustomerService {
  static async getAvailableServices() {
    return await serviceCollection.find({ status: "active" }).toArray();
  }

  static async getServiceById(serviceId: string) {
    return await serviceCollection.findOne({ _id: new ObjectId(serviceId) });
  }

  static async createBooking(customerData: Record<string, unknown>) {
    return await bookingCollection.insertOne({
      ...customerData,
      createdAt: new Date(),
    });
  }

  static async getCustomerBookings(userId: string) {
    return await bookingCollection.find({ customerId: userId }).toArray();
  }
}
