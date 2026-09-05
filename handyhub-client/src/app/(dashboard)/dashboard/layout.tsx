import React from "react";
import DashboardNavbar from "@/Components/dashboard/DashboardNavbar";
import { DashboardSidebar } from "@/Components/dashboard/DashboardSidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#E1D4C2] dark:bg-[#1F1712]">
      <DashboardSidebar />

      <div className="min-h-screen lg:ml-64">
        <DashboardNavbar />

        <main className="px-4 pb-6 pt-20 sm:px-6 sm:pt-24 lg:p-6 lg:mt-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;