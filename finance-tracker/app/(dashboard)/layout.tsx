import { Navigation } from "@/components/navigation/dashboard/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className="container px-4 sm:px-16 max-w-3xl">{children}</div>
      <Navigation />
    </div>
  );
};

export default DashboardLayout;
