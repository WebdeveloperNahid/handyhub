import { DashboardSidebar } from "@/Components/dashboard/DashboardSidebar";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;