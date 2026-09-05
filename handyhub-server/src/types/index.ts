import { ObjectId } from "mongodb";

export type UserRole = "customer" | "user" | "provider" | "admin";

export interface IUser {
  _id?: ObjectId | string;
  name?: string;
  email?: string;
  role?: UserRole;
  [key: string]: unknown;
}

export interface ISession {
  _id?: ObjectId | string;
  token: string;
  userId: ObjectId | string;
  createdAt?: Date;
  expiresAt?: Date;
  [key: string]: unknown;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
