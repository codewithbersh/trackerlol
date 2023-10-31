import { PropsWithChildren } from "react";
import { getCurrentUser } from "@/actions/get-current-user";

import { Navigation } from "./_components/navigation";

const MarketingLayout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUser();
  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col gap-16 px-4 lg:px-8">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full  stroke-neutral-300 opacity-50 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)] dark:stroke-muted/50"
        aria-hidden
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={100}
            height={100}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="75%"
          strokeWidth={0}
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
      <div className="w-full py-4 lg:py-8">
        <Navigation isAuthenticated={!!user} />
      </div>
      <div className="mt-4 md:mt-8">{children}</div>
    </div>
  );
};

export default MarketingLayout;
