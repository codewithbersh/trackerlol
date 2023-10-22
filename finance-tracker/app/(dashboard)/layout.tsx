import { Navigation } from "@/components/navigation/dashboard/navigation";
import ModalProvider from "@/components/providers/modal-provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" mx-auto flex min-h-screen w-full flex-col gap-6 lg:flex-row">
      <Navigation />
      <div className="flex-1 lg:ml-[272px] lg:min-h-screen">{children}</div>
      <ModalProvider />
    </div>
  );
};

export default DashboardLayout;
