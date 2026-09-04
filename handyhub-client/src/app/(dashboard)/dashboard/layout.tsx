import React from "react";
import DashboardNavbar from "@/Components/dashboard/DashboardNavbar";
import { DashboardSidebar } from "@/Components/dashboard/DashboardSidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#E1D4C2] dark:bg-[#1F1712]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden w-64 shrink-0 lg:block">
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardNavbar />

          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;