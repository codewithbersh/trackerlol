import { PropsWithChildren } from "react";

import { Navigation } from "./_components/navigation";
import { getCurrentUser } from "@/actions/get-current-user";

const MarketingLayout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUser();
  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col gap-16 px-4 lg:px-8">
      {/* <div className="w-full py-4 lg:py-8">
        <Navigation isAuthenticated={!!user} />
      </div> */}
      <div className="mt-32">{children}</div>
    </div>
  );
};

export default MarketingLayout;
