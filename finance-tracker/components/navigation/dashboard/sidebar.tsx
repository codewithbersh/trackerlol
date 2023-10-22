"use client";

import { cn } from "@/lib/utils";
import { Route } from "@/types/types";
import { Layers, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
  routes: Route[];
}

export const Sidebar = ({ className, routes }: SidebarProps) => {
  return (
    <div
      className={cn(
        "fixed hidden min-h-screen w-[272px] flex-col gap-12 border-r  border-border py-8 lg:flex",
        className,
      )}
    >
      <div className="flex w-full items-center gap-4 pl-8 pr-4 text-primary blur-sm">
        <Layers className="h-6 w-6" strokeWidth={2.5} />
        <h1 className="text-2xl font-bold leading-none">Savvve</h1>
      </div>
      <div className="flex w-full flex-1 flex-col gap-4">
        {routes.map(({ href, icon: Icon, label, active }) => (
          <Link
            href={href}
            key={href}
            className={cn(
              "transition-color group flex items-center gap-4 px-4 py-2 text-sm font-medium text-muted-foreground duration-300 ease-in-out hover:bg-primary-foreground hover:text-primary",
              active &&
                "border-r-brand border-r-2 bg-primary-foreground text-primary",
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
