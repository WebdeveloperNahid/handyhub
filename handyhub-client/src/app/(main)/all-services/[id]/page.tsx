"use client";
import ServiceDetail from "@/Components/services/detailsPage/ServiceDetail";

const ServiceDetailsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return <ServiceDetail params={params} />;
};

export default ServiceDetailsPage;