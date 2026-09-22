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
    const { _id, ...cleanData } = updateData;
    return await serviceCollection.updateOne(
      { _id: new ObjectId(serviceId) },
      { $set: { ...cleanData, updatedAt: new Date() } }
    );
  }

  static async deleteService(serviceId: string) {
    return await serviceCollection.deleteOne({ _id: new ObjectId(serviceId) });
  }

  static async getAllBookings() {
    return await bookingCollection.find({}).toArray();
  }

  static async getAdminStats() {
    const [users, services, bookings] = await Promise.all([
      userCollection.find({}).toArray(),
      serviceCollection.find({}).toArray(),
      bookingCollection.find({}).toArray(),
    ]);

    const totalUsers = users.length;
    const totalCustomers = users.filter((u) => u.role === "user" || u.role === "customer").length;
    const totalProviders = users.filter((u) => u.role === "provider").length;
    const totalAdmins = users.filter((u) => u.role === "admin").length;

    const totalServices = services.length;
    const activeServices = services.filter((s) => s.status === "active").length;
    const pendingServices = services.filter((s) => s.status === "pending").length;

    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
    const activeBookings = bookings.filter(
      (b) => b.status === "Accepted" || b.status === "In Progress"
    ).length;
    const completedBookings = bookings.filter((b) => b.status === "Completed").length;

    const totalRevenue = bookings
      .filter((b) => b.status === "Completed")
      .reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);

    return {
      totalUsers,
      totalCustomers,
      totalProviders,
      totalAdmins,
      totalServices,
      activeServices,
      pendingServices,
      totalBookings,
      pendingBookings,
      activeBookings,
      completedBookings,
      totalRevenue,
    };
  }
}
