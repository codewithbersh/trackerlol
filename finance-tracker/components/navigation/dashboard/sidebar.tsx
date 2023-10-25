"use client";

import { cn } from "@/lib/utils";
import { Route } from "@/types/types";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Raleway } from "next/font/google";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const font = Raleway({ subsets: ["latin"] });

interface SidebarProps {
  className?: string;
  routes: Route[];
}

export const Sidebar = ({ className, routes }: SidebarProps) => {
  return (
    <div
      className={cn(
        "fixed hidden min-h-screen w-[272px] flex-col gap-8 border-r  border-border py-8 lg:flex",
        className,
      )}
    >
      <Link
        className="flex items-center gap-1 px-4 blur-sm hover:opacity-75"
        href="/"
      >
        <Logo className="h-4 w-4 sm:h-5 sm:w-5" />
        <h1
          className={cn("font-extrabold text-brand sm:text-lg", font.className)}
        >
          TRACKERLOL
        </h1>
      </Link>
      <div className="flex w-full flex-1 flex-col gap-4">
        {routes.map(({ href, icon: Icon, label, active }) => (
          <Link
            href={href}
            key={href}
            className={cn(
              "transition-color group flex items-center gap-4 px-4 py-2 text-sm font-medium text-muted-foreground duration-300 ease-in-out hover:bg-primary/5 hover:text-primary hover:dark:bg-primary-foreground",
              active &&
                "border-r-2 border-r-brand bg-primary/5 text-primary dark:bg-primary-foreground",
            )}
          >
            <Icon className={cn("h-4 w-4", active && "text-brand  ")} />
            <span>{label}</span>
          </Link>
        ))}

        <Button
          variant="link"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-auto w-fit gap-4 px-4 text-muted-foreground hover:text-primary"
          size="sm"
        >
          <LogOut className="h-4 w-4" />
          <span>Log-out</span>
        </Button>
      </div>
    </div>
  );
};
