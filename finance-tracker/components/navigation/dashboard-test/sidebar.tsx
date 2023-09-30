"use client";

import { cn } from "@/lib/utils";
import { Route } from "@/types/types";
import { Layers } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  className?: string;
  routes: Route[];
}

export const Sidebar = ({ className, routes }: SidebarProps) => {
  return (
    <div
      className={cn(
        "hidden min-h-screen w-[272px] flex-col gap-12 border-r border-border  px-4 py-8 lg:flex",
        className,
      )}
    >
      <div className="flex w-full items-center gap-4 px-4 text-primary">
        <Layers className="h-6 w-6" strokeWidth={2.5} />
        <h1 className="text-2xl font-bold leading-none">Savvve</h1>
      </div>
      <div className="flex w-full flex-col gap-4">
        {routes.map(({ href, icon: Icon, label, active }) => (
          <Link
            href={href}
            key={href}
            className={cn(
              "flex w-full items-center gap-4 rounded-md p-4 text-sm font-medium leading-none text-muted-foreground transition hover:bg-accent hover:text-primary",
              active &&
                "bg-foreground text-primary-foreground hover:bg-foreground/90 hover:text-primary-foreground/90",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* <ModeToggle /> */}
    </div>
  );
};
