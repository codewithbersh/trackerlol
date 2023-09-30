import { Navigation } from "@/components/navigation/dashboard-test/navigation";
import ModalProvider from "@/components/providers/modal-provider";

const DashboardLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <div className=" mx-auto flex min-h-screen max-w-screen-xl flex-col gap-6 lg:flex-row">
      <Navigation />
      <div className="  flex-1 px-4">{children}</div>
      <ModalProvider />
      {modal}
    </div>
  );
};

export default DashboardLayout;
