import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";

interface AnalyticsloadingProps {
  numberOfSpinners?: number;
  className?: string;
}

export const AnalyticsLoading = ({
  numberOfSpinners = 1,
  className,
}: AnalyticsloadingProps) => {
  const spinners = Array.from(
    { length: numberOfSpinners },
    (_, index) => index,
  );
  return (
    <>
      {spinners.map((spinner) => (
        <Spinner
          key={spinner}
          className={cn(
            "col-span-full grid min-h-[238px] w-full animate-pulse place-items-center rounded-md border bg-accent/10 p-4",
            className,
          )}
        />
      ))}
    </>
  );
};
