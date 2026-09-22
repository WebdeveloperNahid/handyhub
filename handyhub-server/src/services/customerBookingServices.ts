import { ObjectId } from "mongodb";
import {
    bookingCollection,
    serviceCollection,
    userCollection,
} from "../config/db";

export interface CreateBookingData {
    serviceId: string;

    serviceName: string;
    serviceImage?: string;
    serviceCategory: string;
    providerId: string;
    price: number;

    bookingDate: string;
    bookingTime: string;
    address: string;
}

export class CustomerBookingService {

    // 1. Create Booking
    static async createBooking(
        customerId: string,
        bookingData: CreateBookingData,
    ) {
        console.log("🔥 CUSTOMER BOOKING SERVICE CALLED");
        const {
            serviceId,
            serviceName,
            serviceImage,
            serviceCategory,
            providerId,
            price,
            bookingDate,
            bookingTime,
            address,
        } = bookingData;

        if (!ObjectId.isValid(serviceId)) {
            return {
                success: false,
                message: "Invalid service ID",
            };
        }

        const service = await serviceCollection.findOne({
            _id: new ObjectId(serviceId),
            status: "active",
        });

        if (!service) {
            return {
                success: false,
                message: "Service not found or unavailable",
            };
        }

        const newBooking = {
            customerId,

            // Service data
            serviceId,
            serviceName,
            serviceImage,
            serviceCategory,
            providerId,
            price,

            // Booking data
            bookingDate,
            bookingTime,
            address,

            status: "pending",

            createdAt: new Date(),
            updatedAt: new Date(),
        };

        console.log("NEW BOOKING DATA:", newBooking);
        await bookingCollection.insertOne(newBooking);
        const result =
            await bookingCollection.insertOne(
                newBooking,
            );

        return {
            success: true,
            message: "Booking created successfully",
            bookingId: result.insertedId,
        };
    }

    // 2. Get Customer Bookings
    static async getCustomerBookings(
        customerId: string,
    ) {
        const bookings = await bookingCollection
            .find({ customerId })
            .sort({ createdAt: -1 })
            .toArray();

        if (!bookings.length) {
            return [];
        }

        const serviceIds = bookings
            .filter((booking) =>
                ObjectId.isValid(
                    String(booking.serviceId),
                ),
            )
            .map(
                (booking) =>
                    new ObjectId(
                        String(booking.serviceId),
                    ),
            );

        const services = await serviceCollection
            .find({
                _id: { $in: serviceIds },
            })
            .toArray();

        const providerIds = [
            ...new Set(
                services
                    .map(
                        (service) =>
                            service.providerId,
                    )
                    .filter(Boolean)
                    .map(String),
            ),
        ];

        const providerObjectIds = providerIds
            .filter((id) => ObjectId.isValid(id))
            .map((id) => new ObjectId(id));

        const providers = await userCollection
            .find({
                _id: { $in: providerObjectIds },
            })
            .toArray();

        const serviceMap = new Map(
            services.map((service) => [
                service._id.toString(),
                service,
            ]),
        );

        const providerMap = new Map(
            providers.map((provider) => [
                provider._id.toString(),
                provider,
            ]),
        );

        return bookings.map((booking) => {
            const service = serviceMap.get(
                String(booking.serviceId),
            );

            const provider = service
                ? providerMap.get(
                    String(
                        service.providerId,
                    ),
                )
                : null;

            return {
                ...booking,

                serviceTitle:
                    service?.title ||
                    booking.serviceName ||
                    "Service",

                category:
                    service?.category ||
                    booking.serviceCategory ||
                    "",

                price:
                    booking.price ??
                    service?.price ??
                    0,

                providerName:
                    provider?.name ||
                    "Service Provider",

                status:
                    booking.status ||
                    "pending",
            };
        });
    }

    // 3. Get Single Customer Booking
    static async getCustomerBooking(
        customerId: string,
        bookingId: string,
    ) {
        if (!ObjectId.isValid(bookingId)) {
            return null;
        }

        return await bookingCollection.findOne({
            _id: new ObjectId(bookingId),
            customerId,
        });
    }

    // 4. Cancel Booking
    static async cancelBooking(
        customerId: string,
        bookingId: string,
    ) {
        if (!ObjectId.isValid(bookingId)) {
            return null;
        }

        return await bookingCollection.updateOne(
            {
                _id: new ObjectId(bookingId),
                customerId,
                status: "pending",
            },
            {
                $set: {
                    status: "cancelled",
                    updatedAt: new Date(),
                },
            },
        );
    }
}