"use client";

import { Route } from "@/types/types";
import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Raleway } from "next/font/google";
import { useScrollTop } from "@/hooks/use-scroll-top";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { signOut } from "next-auth/react";

const font = Raleway({ subsets: ["latin"] });

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
        "fixed  z-50 ml-4 flex w-full max-w-[calc(100%-32px)] items-center justify-between rounded-md bg-background/50 px-0 py-4 backdrop-blur-md transition-all duration-300 ease-in-out lg:hidden",
        scrolled && " translate-y-4  bg-accent/25 px-4",
      )}
    >
      <Link className="flex items-center gap-1 hover:opacity-75" href="/">
        <Logo className="h-4 w-4 sm:h-5 sm:w-5" />
        <h1
          className={cn("font-extrabold text-brand sm:text-lg", font.className)}
        >
          TRACKERLOL
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
        <DropdownMenuContent
          align="end"
          className="flex w-[calc(100vw-32px)] flex-col gap-2 p-4 lg:hidden "
          sideOffset={21}
        >
          {routes.map(({ icon: Icon, href, label }) => (
            <DropdownMenuItem
              onSelect={() => {
                setOpen(false);
                router.push(`${href}`);
              }}
              key={href}
            >
              <div className="flex h-full w-full items-center gap-4 py-1 ">
                <Icon className="h-4 w-4" />
                <span> {label}</span>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onSelect={() => signOut({ callbackUrl: "/" })}>
            <div className="flex h-full w-full items-center gap-4 py-1">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
