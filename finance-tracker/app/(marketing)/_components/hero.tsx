import {
  ArrowRight,
  CalendarIcon,
  ChevronDown,
  LayoutGrid,
  Shapes,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { COLORS, EMOJIS } from "./config";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FeaturesHeading } from "./features-heading";
import { JoinWaitlist } from "./join-waitlist";
import Balancer from "react-wrap-balancer";

interface HeroProps {
  isAuthenticated: boolean;
}

export const Hero = ({ isAuthenticated }: HeroProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="space-y-4">
        <div
          className="relative mx-auto w-fit animate-fade-up opacity-0"
          style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
        >
          <div className="relative z-50 mx-auto w-fit rounded-full border-t bg-gradient-to-t from-background to-primary-foreground/50 p-2">
            <div className="rounded-full border-t bg-gradient-to-t from-background to-primary-foreground/50 p-2">
              <div className="rounded-full border-t bg-gradient-to-t from-background to-primary-foreground/50 p-4">
                <Logo className="h-8 w-8  md:h-12 md:w-12" />
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 z-0 hidden h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-t from-brand/25 to-pink-500/25 blur-2xl dark:block" />
          <div className="absolute left-1/2 top-1/2 z-0 block h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-t from-background via-background to-pink-500/75 blur-2xl dark:hidden" />
        </div>

        <div className="space-y-4">
          <h1
            className=" animate-fade-up  text-center text-3xl font-medium  text-primary/95 opacity-0 sm:text-5xl"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Supercharge your finances with{" "}
              <span className="bg-gradient-to-r from-pink-400 via-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                Tracker - the Personal Finance for the Web
              </span>
            </Balancer>
          </h1>
          <p
            className="mx-auto max-w-[467px] animate-fade-up text-center  font-medium text-indigo-300/75 opacity-0 md:max-w-[550px] md:text-lg"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            A simplified finance tracker built for everyone. Navigate your
            finances by tracking your spending and budgets.
          </p>
        </div>
      </div>

      <Button
        className="mt-4 animate-fade-up opacity-0"
        variant="brand"
        asChild
        style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
      >
        {isAuthenticated ? (
          <Link href="/transactions">
            View Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        ) : (
          <Link href="/login">
            Join — <span className="italic">it&apos;s free</span>{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </Button>
      {/* <div
        className="mt-4 w-full max-w-[250px] animate-fade-up opacity-0"
        style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
      >
        <JoinWaitlist />
      </div> */}

      <div className="mt-16 grid grid-cols-1 gap-8 md:mt-24 md:grid-cols-2">
        <div
          style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
          className=" group col-span-1 animate-fade-up rounded-sm bg-accent/25 pb-4 opacity-0 dark:border-t md:pb-8"
        >
          <div className="p-4 md:p-8">
            <FeaturesHeading
              title="Create Categories"
              description="Organize your expenses with ease by creating custom categories that match your unique financial goals."
            />
          </div>

          <div className="space-y-4 overflow-hidden">
            <div className="flex -translate-x-[20px] gap-4">
              {new Array(12).fill(null).map((_, idx) => (
                <div
                  key={idx}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-md"
                  style={{
                    backgroundColor:
                      COLORS[Math.floor(Math.random() * COLORS.length)],
                  }}
                >
                  <span className="text-xl leading-none">
                    {EMOJIS[Math.floor(Math.random() * EMOJIS.length)]}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex translate-x-2 gap-4">
              {new Array(12).fill(null).map((_, idx) => (
                <div
                  key={idx}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-md"
                  style={{
                    backgroundColor:
                      COLORS[Math.floor(Math.random() * COLORS.length)],
                  }}
                >
                  <span className="text-xl leading-none">
                    {EMOJIS[Math.floor(Math.random() * EMOJIS.length)]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{ animationDelay: "0.65s", animationFillMode: "forwards" }}
          className="col-span-1 row-span-2 aspect-square h-full max-h-[574px] w-full animate-fade-up overflow-hidden rounded-sm bg-accent/25 p-4 opacity-0  dark:border-t md:aspect-auto md:p-8"
        >
          <FeaturesHeading
            title="Track Anytime, Anywhere"
            description="Access your financial data from anywhere, at any time, to stay on top of your money management, whether you're at home or on the go."
          />

          <div className=" ">
            <Image
              alt=""
              src="/budgets-mockup-light.png"
              width={2018}
              height={4090}
              className="translate-y-12 dark:hidden"
            />
            <Image
              alt=""
              src="/budgets-mockup-dark.png"
              width={2018}
              height={4090}
              className="hidden translate-y-12 dark:block"
            />
          </div>
        </div>
        <div
          style={{ animationDelay: "0.75s", animationFillMode: "forwards" }}
          className="col-span-1 animate-fade-up overflow-hidden rounded-sm bg-accent/25 p-4 opacity-0 dark:border-t md:p-8"
        >
          <FeaturesHeading
            title="Filter Transactions"
            description="Sift through your transactions effortlessly and gain insights into your spending patterns with our intuitive filtering system."
          />

          <div className="flex h-full min-w-[600px] translate-x-[8%] translate-y-6 rounded-md border bg-background p-4">
            <div className="flex gap-4 pb-12">
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "flex max-h-10 cursor-default justify-start gap-2 border-brand text-xs text-brand hover:bg-inherit hover:text-brand",
                )}
              >
                <Shapes className="h-3 w-3 opacity-50" />
                Income
                <ChevronDown className="ml-auto h-3 w-3 shrink-0 opacity-50" />
              </Button>

              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "flex max-h-10 cursor-default justify-start gap-2 text-xs hover:bg-inherit",
                )}
              >
                <LayoutGrid className="h-3 w-3 opacity-50" />
                Category
                <ChevronDown className="ml-auto h-3 w-3 shrink-0 opacity-50" />
              </Button>

              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "flex max-h-10  shrink-0 cursor-default justify-start gap-2 border-brand text-xs  text-brand hover:bg-inherit hover:text-brand",
                )}
              >
                <CalendarIcon className="h-3 w-3 opacity-50" />
                Dec 22 — Dec 22
                <ChevronDown className="ml-auto h-3 w-3 shrink-0 opacity-50" />
              </Button>

              <Button
                variant="ghost"
                role="combobox"
                className={cn(
                  "flex max-h-10  shrink-0 cursor-default justify-start gap-2 text-xs hover:bg-inherit",
                )}
              >
                <X className="h-3 w-3 opacity-50" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
