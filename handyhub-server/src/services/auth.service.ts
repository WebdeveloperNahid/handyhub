import { ObjectId } from "mongodb";
import { sessionCollection, userCollection } from "../config/db";
import { IUser } from "../types";

export class AuthService {
  static async getCurrentUser(userId: string | ObjectId) {
    const query = { _id: typeof userId === "string" ? new ObjectId(userId) : userId };
    return await userCollection.findOne(query);
  }

  static async findUserByEmail(email: string) {
    return await userCollection.findOne({ email });
  }

  static async validateSession(token: string) {
    return await sessionCollection.findOne({ token });
  }

  static async createSession(userId: string | ObjectId, token: string) {
    return await sessionCollection.insertOne({
      userId,
      token,
      createdAt: new Date(),
    });
  }

  static async deleteSession(token: string) {
    return await sessionCollection.deleteOne({ token });
  }
}
