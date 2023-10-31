import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const spinnerVariants = cva("animate-spin text-muted-foreground", {
  variants: {
    variant: {
      default: "w-4 h-4",
      large: "w-6 h-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

export const Spinner = ({ variant, className, ...props }: SpinnerProps) => {
  return (
    <div
      className={cn("grid h-full w-full place-items-center", className)}
      {...props}
    >
      <Loader2 className={cn(spinnerVariants({ variant }))} />
    </div>
  );
};
