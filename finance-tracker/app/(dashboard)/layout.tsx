import { Navigation } from "@/components/navigation/dashboard/navigation";
import ModalProvider from "@/components/providers/modal-provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" mx-auto flex min-h-screen max-w-screen-xl flex-col gap-6 lg:flex-row">
      <Navigation />
      <div className="flex-1  px-4 lg:ml-[272px] lg:min-h-screen lg:px-8">
        {children}
      </div>
      <ModalProvider />
    </div>
  );
};

export default DashboardLayout;
