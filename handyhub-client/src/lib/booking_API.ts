const BACKEND_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

export interface CreateBookingPayload {
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

export const createBooking = async (
    bookingData: CreateBookingPayload,
    token: string,
) => {
    const res = await fetch(
        `${BACKEND_URL}/api/v1/customer/bookings`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bookingData),
        },
    );

    const data = await res.json();

    if (!res.ok) {
        if (res.status === 403) {
            throw new Error("Only customers can book services.");
        }

        throw new Error(
            data?.message || "Failed to create booking.",
        );
    }

    return data;
};

export const getMyBookings = async (token: string) => {
    const res = await fetch(
        `${BACKEND_URL}/api/v1/customer/bookings`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        },
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data?.message || "Failed to fetch bookings.",
        );
    }

    return data;
};

export const cancelBooking = async (
    bookingId: string,
    token: string,
) => {
    const res = await fetch(
        `${BACKEND_URL}/api/v1/customer/bookings/${bookingId}/cancel`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data?.message || "Failed to cancel booking.",
        );
    }

    return data;
};