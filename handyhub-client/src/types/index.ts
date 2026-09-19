export type ServiceCategory =
  | "Plumbing"
  | "Electrical"
  | "Cleaning"
  | "Painting"
  | "Home Repair"
  | "Appliance Repair";

export type ServiceStatus = "active" | "inactive";

export interface ProviderService {
  _id: string;
  providerId: string;
  title: string;
  category: ServiceCategory | string;
  description: string;
  price: number;
  duration: string;
  image?: string;
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
  status: "available" | "busy" | "by-appointment";
  days: string[];
  workingHours: {
    from: string;
    to: string;
  };
  instantBooking: boolean;
  responseTime: string;
}

export interface NewServicePayload {
  id: string;
  providerId: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  availability: ServiceAvailability;
  duration?: string;
  highlights?: string[];
  createdAt: string;
}

