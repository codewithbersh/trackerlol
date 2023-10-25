import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface FinalCallToActionProps {
  isAuthenticated: boolean;
}

export const FinalCallToAction = ({
  isAuthenticated,
}: FinalCallToActionProps) => {
  return (
    <div
      className="animate-fade-up flex w-full flex-col items-center justify-center gap-4 rounded-md border border-brand p-4 opacity-0 md:p-8"
      style={{ animationDelay: "1s", animationFillMode: "forwards" }}
    >
      <h1 className="text-center text-2xl font-medium sm:text-4xl">
        Supercharge your finances <br /> with insights.
      </h1>
      <p className="text-center text-muted-foreground">
        Lorem ipsum dolor sit amet consectur lorem ipsum dolor sit <br /> amet
        consectur lorem ipsum.
      </p>
      <Button variant="brand" asChild>
        {isAuthenticated ? (
          <Link href="/transaction">
            View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        ) : (
          <Link href="/login">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </Button>
    </div>
  );
};
