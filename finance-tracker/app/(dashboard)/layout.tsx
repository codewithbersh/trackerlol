import { Navigation } from "@/components/navigation/dashboard/navigation";
import ModalProvider from "@/components/providers/modal-provider";

const DashboardLayout = (props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen">
      <div className="container px-4 sm:px-16 max-w-3xl">{props.children}</div>
      <Navigation />
      <ModalProvider />
      {props.modal}
    </div>
  );
};

export default DashboardLayout;
