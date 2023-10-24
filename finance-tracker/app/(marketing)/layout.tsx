import { PropsWithChildren } from "react";
import { Navigation } from "./_components/navigation";
import { getCurrentUser } from "@/actions/get-current-user";

const MarketingLayout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUser();
  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col">
      <div className="w-full py-4 lg:py-8">
        <Navigation isAuthenticated={!!user} />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MarketingLayout;
