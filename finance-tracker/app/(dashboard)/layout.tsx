import { Navigation } from "@/components/navigation/dashboard/navigation";
import ModalProvider from "@/components/providers/modal-provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className="container px-4 sm:px-16 max-w-3xl">{children}</div>
      <Navigation />
      <ModalProvider />
    </div>
  );
};

export default DashboardLayout;
