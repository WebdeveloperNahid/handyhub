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

export interface ServiceAvailability {
  status: "available" | "busy" | "by-appointment" | string;
  days: string[];
  workingHours: {
    from: string;
    to: string;
  };
  instantBooking?: boolean;
  responseTime?: string;
}

export interface IService {
  _id?: ObjectId | string;
  providerId: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image?: string;
  availability?: ServiceAvailability;
  duration?: string;
  highlights?: string[];
  status?: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: unknown;
}

export type BookingStatus =
  | "Pending"
  | "Accepted"
  | "In Progress"
  | "Completed"
  | "Rejected"
  | "Cancelled";

export interface IBooking {
  _id?: ObjectId | string;
  customerId: string;
  providerId: string;
  serviceId: string;
  date?: string;
  time?: string;
  status: BookingStatus | string;
  notes?: string;
  price?: number;
  serviceTitle?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

