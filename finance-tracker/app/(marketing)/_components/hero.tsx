import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

interface HeroProps {
  isAuthenticated: boolean;
}

export const Hero = ({ isAuthenticated }: HeroProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:pt-0">
      <div className="space-y-1">
        <div className="mx-auto w-fit rounded-full border-t bg-gradient-to-t from-background to-primary-foreground/50 p-2">
          <div className="rounded-full border-t bg-gradient-to-t from-background to-primary-foreground/50 p-2">
            <div className="rounded-full border-t bg-gradient-to-t from-background to-primary-foreground/50 p-4">
              <Logo className="h-8 w-8  md:h-12 md:w-12" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-center text-4xl font-medium leading-[1.2] tracking-wide text-primary/95 md:text-6xl">
            The Personal Finance <br className="hidden min-[374px]:block" /> for
            the Web
          </h1>
          <p className="mx-auto max-w-[467px] bg-gradient-to-r from-pink-400 via-indigo-400 to-indigo-600 bg-clip-text text-center font-medium text-transparent md:max-w-[550px] md:text-lg">
            A simplified finance tracker built for everyone. Navigate your
            finances by tracking your spending and budgets.
          </p>
        </div>
      </div>

      <div className="mt-8 flex w-fit gap-4">
        <Button variant="ghost">Learn More</Button>
        <Button variant="brand" asChild>
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
      </div>

      <div className="mt-8 rounded-[32px] border p-4">
        <div className=" rounded-[16px] border-[8px] ">
          <Image
            src="/transactions-light.jpg"
            alt="transactions"
            className="rounded-md  dark:hidden"
            width={4080}
            height={2492}
            priority
            sizes="100vw"
          />
          <Image
            src="/transactions-dark.jpg"
            alt="transactions"
            className="hidden rounded-md dark:block"
            width={4080}
            height={2492}
            priority
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
};
