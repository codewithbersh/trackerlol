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
        "fixed top-4 flex w-[calc(100%-32px)] max-w-[960px] items-center justify-between gap-4 rounded-md py-2 transition-all duration-300 ease-in-out",
        scrolled && "bg-accent/50 px-4 backdrop-blur-lg",
      )}
    >
      <Link className="flex items-center gap-2 hover:opacity-75" href="/">
        <Logo className="h-5 w-5 sm:h-7 sm:w-7" />
        <h1 className={cn("text-base font-bold sm:text-xl", font.className)}>
          Tracker<span className="italic text-brand">.lol</span>
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
