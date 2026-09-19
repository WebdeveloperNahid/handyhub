import OverviewHeader from "@/Components/dashboard/user/OverviewHeader";
import OverviewStats from "@/Components/dashboard/user/OverviewStats";
import QuickActions from "@/Components/dashboard/user/QuickActions";
import RecentRequests from "@/Components/dashboard/user/RecentRequests";

const UserPage = () => {
  return (
    <div className="space-y-8 text-[#291C0E] dark:text-[#E8DDCE]">
      <OverviewHeader />

      <OverviewStats />

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <RecentRequests />
        <QuickActions />
      </div>
    </div>
  );
};

export default UserPage;