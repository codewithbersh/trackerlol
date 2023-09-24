import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const categoryBadgeVariants = cva(
  "inline-flex items-center gap-2 text-neutral-950 rounded-full font-medium px-3 py-1 !leading-none hover:bg-inherit/80 transition-colors",
  {
    variants: {
      variant: {
        default: "text-base",
        small: "text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CategoryBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof categoryBadgeVariants> {
  backgroundColor: string;
  emoji: string;
  title: string;
}

function CategoryBadge({
  backgroundColor,
  emoji,
  title,
  className,
  variant,
  ...props
}: CategoryBadgeProps) {
  return (
    <div
      className={cn(categoryBadgeVariants({ variant }), className)}
      {...props}
      style={{ backgroundColor }}
    >
      <span>{emoji}</span>
      <span>{title}</span>
    </div>
  );
}

export { CategoryBadge, categoryBadgeVariants };
