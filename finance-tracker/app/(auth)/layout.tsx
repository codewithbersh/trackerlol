import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  if (true) {
    return notFound();
  }
  return (
    <div className="relative grid h-screen place-items-center">
      <Button
        variant="ghost"
        className="absolute left-4 top-4 md:left-8 md:top-8"
        asChild
      >
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Home
        </Link>
      </Button>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
