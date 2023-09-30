"use client";

import { Route } from "@/types/types";
import { Layers, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopbarProps {
  routes: Route[];
}

export const Topbar = ({ routes }: TopbarProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="fixed flex w-full items-center justify-between bg-accent/50 px-4 py-4 backdrop-blur-lg lg:hidden">
      <div className="flex w-full items-center gap-4 text-primary sm:px-8">
        <Layers className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={2.5} />
        <h1 className="font-bold leading-none sm:text-lg">Savvve</h1>
      </div>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger onClick={() => setOpen(true)} asChild>
          <button className="h-fit w-fit rounded-md bg-primary-foreground p-1.5 transition hover:bg-primary-foreground/75">
            <Menu className=" h-4 w-4 text-primary sm:h-5 sm:w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="lg:hidden">
          {routes.map(({ icon: Icon, href, label }) => (
            <DropdownMenuItem
              onSelect={() => {
                setOpen(false);
                router.push(`${href}`);
              }}
              key={href}
            >
              <div className="flex h-full w-full items-center gap-4 ">
                <Icon className="h-3 w-3" />
                <span> {label}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
