import { cn } from "@/lib/utils";

export const MainWrapper = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto mt-8 w-full max-w-5xl px-4 lg:mt-24 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
};
