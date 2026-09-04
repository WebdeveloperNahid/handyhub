import Filtering from "@/Components/services/Filtering";
import Paginations from "@/Components/services/Paginations";
import ServiceCard from "@/Components/services/ServiceCard";

const services = [
    {
        id: 1,
        title: "Professional Plumbing",
        category: "Plumbing",
        description:
            "Reliable plumbing services for leaks, pipes, fittings and home repairs.",
        price: 500,
        rating: 4.9,
        reviews: 124,
        duration: "1–2 hrs",
        icon: "plumbing",
    },
    {
        id: 2,
        title: "Electrical Repair",
        category: "Electrical",
        description:
            "Professional electrical installation, repair and maintenance services.",
        price: 600,
        rating: 4.8,
        reviews: 98,
        duration: "1–2 hrs",
        icon: "electrical",
    },
    {
        id: 3,
        title: "Home Cleaning",
        category: "Cleaning",
        description:
            "Professional cleaning services to keep your home fresh and comfortable.",
        price: 800,
        rating: 4.9,
        reviews: 156,
        duration: "2–3 hrs",
        icon: "cleaning",
    },
    {
        id: 4,
        title: "House Painting",
        category: "Painting",
        description:
            "Quality interior and exterior painting services for your home.",
        price: 1200,
        rating: 4.7,
        reviews: 87,
        duration: "3–5 hrs",
        icon: "painting",
    },
    {
        id: 5,
        title: "Home Repair",
        category: "Home Repair",
        description:
            "General home repair and maintenance services from skilled professionals.",
        price: 700,
        rating: 4.8,
        reviews: 76,
        duration: "1–3 hrs",
        icon: "repair",
    },
    {
        id: 6,
        title: "Appliance Repair",
        category: "Appliance Repair",
        description:
            "Expert repair services for common household appliances.",
        price: 900,
        rating: 4.8,
        reviews: 91,
        duration: "1–2 hrs",
        icon: "appliance",
    },
];

const AllServices = () => {
    return (
        <main className="min-h-screen bg-[#E1D4C2] text-[#291C0E] transition-colors duration-500 dark:bg-[#1F1712] dark:text-[#E1D4C2]">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
                
                {/* Page Header */}
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6E473B] dark:text-[#A78D78]">
                        HandyHub
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Explore Services
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6E473B]/70 dark:text-[#C5B8AA]/70 sm:text-base">
                        Find trusted professionals for your everyday needs.
                    </p>
                </div>

                {/* Filtering */}
                <Filtering />

                {/* Service Cards */}
                <ServiceCard services={services} />

                {/* Pagination */}
                <Paginations />
            </div>
        </main>
    );
};

export default AllServices;