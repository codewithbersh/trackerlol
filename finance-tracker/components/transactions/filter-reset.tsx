import { X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface FilterResetProps {
  href: string;
}

export const FilterReset = ({ href }: FilterResetProps) => {
  return (
    <Link href={href} passHref>
      <Button variant="ghost" className="gap-2">
        Reset <X className="h-4 w-4" />
      </Button>
    </Link>
  );
};
