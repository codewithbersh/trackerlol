"use client";

import { cn } from "@/lib/utils";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useScrollTop } from "@/hooks/use-scroll-top";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const font = Raleway({ subsets: ["latin"] });

interface NavigationProps {
  isAuthenticated: boolean;
}

export const Navigation = ({ isAuthenticated }: NavigationProps) => {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "fixed top-4 z-[9999] flex w-[calc(100%-32px)] max-w-[960px] items-center justify-between gap-4 rounded-sm py-2 transition-all duration-300 ease-in-out",
        scrolled && "bg-accent/50 px-4 backdrop-blur-lg",
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
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" asChild>
          {isAuthenticated ? (
            <div
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="cursor-pointer"
            >
              Logout
            </div>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </Button>
        <Button variant="brand">
          {isAuthenticated ? (
            <Link href="/transactions">Dashboard</Link>
          ) : (
            <Link href="/login">Get Started</Link>
          )}
        </Button>
      </div>
    </div>
  );
};
