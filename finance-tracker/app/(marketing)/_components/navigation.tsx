"use client";

import { cn } from "@/lib/utils";
import { Raleway } from "next/font/google";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const font = Raleway({ subsets: ["latin"] });

interface NavigationProps {
  isAuthenticated: boolean;
}

export const Navigation = ({ isAuthenticated }: NavigationProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Link className="flex items-center gap-2 hover:opacity-75" href="/">
        <Logo className="h-7 w-7" />
        <h1 className={cn("text-xl font-bold", font.className)}>
          Tracker<span className="text-brand italic">.lol</span>
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
