export type ServiceCategory =
  | "Plumbing"
  | "Electrical"
  | "Cleaning"
  | "Painting"
  | "Home Repair"
  | "Appliance Repair";

export type ServiceStatus = "active" | "inactive" | "pending";

export interface ProviderService {
  _id: string;
  providerId: string;
  title: string;
  category: ServiceCategory | string;
  description: string;
  price: number;
  duration: string;
  image?: string;
  availability?: ServiceAvailability;
  status: ServiceStatus;
  createdAt?: string;
  updatedAt?: string;
}

// Payload shape used when creating/editing a service from the dashboard form
export interface ServiceFormValues {
  title: string;
  category: string;
  description: string;
  price: string; // kept as string while inside the form, parsed to number on submit
  duration: string;
  image: string;
  status: ServiceStatus;
  availability?: Partial<ServiceAvailability>;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Painting",
  "Home Repair",
  "Appliance Repair",
];

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

export interface NewServicePayload {
  id?: string;
  _id?: string;
  providerId: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image?: string;
  availability?: ServiceAvailability;
  duration?: string;
  highlights?: string[];
  status?: ServiceStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type BookingStatus =
  | "Pending"
  | "Accepted"
  | "In Progress"
  | "Completed"
  | "Rejected"
  | "Cancelled";

export interface Booking {
  _id: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface ProviderStats {
  totalServices: number;
  activeServices: number;
  pendingBookings: number;
  activeJobs: number;
  completedBookings: number;
  estimatedRevenue: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}


