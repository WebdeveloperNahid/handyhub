import { FiCheckCircle } from "react-icons/fi";

const ServiceIncluded = () => {
    const features = [
        "Professional service from an experienced provider",
        "Inspection and basic troubleshooting",
        "Quality-focused repair or maintenance",
        "Clear pricing before starting the work",
    ];

    return (
        <section className="mt-10">
            <h2 className="text-xl font-bold text-[#1C1917] dark:text-[#F4F4F5]">
                What&apos;s included
            </h2>

            <div className="mt-5 space-y-3">
                {features.map((item) => (
                    <div
                        key={item}
                        className="flex items-start gap-3"
                    >
                        <FiCheckCircle
                            size={18}
                            className="mt-0.5 shrink-0 text-[#15803D] dark:text-[#22C55E]"
                        />

                        <p className="text-sm leading-6 text-[#1C1917]/70 dark:text-[#A1A1AA]">
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServiceIncluded;