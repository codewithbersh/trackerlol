"use client";

import { Route } from "@/types/types";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Raleway } from "next/font/google";
import { useScrollTop } from "@/hooks/use-scroll-top";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Logo } from "@/components/logo";

const logo = Raleway({ subsets: ["latin"] });

interface TopbarProps {
  routes: Route[];
}

export const Topbar = ({ routes }: TopbarProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "fixed  z-50 ml-4 flex w-full max-w-[calc(100%-32px)] items-center justify-between bg-background/50 px-0 py-4 backdrop-blur-md transition-all duration-500 ease-in-out lg:hidden",
        scrolled && " translate-y-4 rounded-md bg-accent/25 px-4",
      )}
    >
      <Link
        className="flex w-fit items-center gap-1 text-primary hover:opacity-75"
        href="/"
      >
        <Logo className="h-6 w-6" />
        <h1 className={cn("text-base font-bold leading-none", logo.className)}>
          Tracker.<span className="text-brand italic">lol</span>
        </h1>
      </Link>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger onClick={() => setOpen(true)} asChild>
          <button
            className={cn(
              "h-fit w-fit rounded-md  p-1.5 transition",
              scrolled && "bg-background/50",
            )}
          >
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
