import { COLORS, EMOJIS } from "./config";
import { CalendarIcon, ChevronDown, LayoutGrid, Shapes, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FeaturesHeading } from "./features-heading";

export const Features = () => {
  return (
    <div className="flex flex-col gap-8 ">
      <div className="mx-auto flex w-fit flex-col items-center gap-2">
        <button className="rounded-full border bg-accent/50 px-2 py-[2px] text-sm font-medium text-muted-foreground">
          User Friendly
        </button>
        <h1 className="w-full max-w-[420px] text-center text-2xl font-medium sm:w-2/3 sm:max-w-none sm:text-4xl">
          Be in control. Navigate through your finances with ease.
        </h1>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="group col-span-1 rounded-sm bg-accent/25 pb-4 dark:border-t md:pb-8">
          <div className="p-4 md:p-8">
            <FeaturesHeading
              title="Create Categories"
              description="Lorem ipsum dolor sit aemt consectur lorem ipsum dolor silasd ndsamet consect."
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

        <div className="col-span-1 row-span-2 aspect-square h-full max-h-[574px] w-full overflow-hidden rounded-sm bg-accent/25 p-4  dark:border-t md:aspect-auto md:p-8">
          <FeaturesHeading
            title="Track Anytime, Anywhere"
            description="Lorem ipsum dolor sit aemt consectur lorem ipsum dolor silasd ndsamet consect."
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

        <div className="col-span-1 overflow-hidden rounded-sm bg-accent/25 p-4 dark:border-t md:p-8">
          <FeaturesHeading
            title="Filter Transactions"
            description="Lorem ipsum dolor sit aemt consectur lorem ipsum dolor silasd ndsamet consect."
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
