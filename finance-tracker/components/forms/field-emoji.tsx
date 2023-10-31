import Picker from "@emoji-mart/react";
import { SmilePlus, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn, translateTheme } from "@/lib/utils";
import { data } from "@/lib/emoji-data";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";

interface FieldEmojiProps {
  onChange: (value: string) => void;
  value: string;
  currentColor: string;
  isLoading: boolean;
  currentName: string;
}

export const FieldEmoji = ({
  onChange,
  value,
  currentColor,
  isLoading,
  currentName,
}: FieldEmojiProps) => {
  const { theme } = useTheme();

  if (value) {
    return (
      <Button
        variant="outline"
        className={cn(
          "group relative box-border h-20 w-full border-collapse   justify-start  rounded-md  px-4",
          currentColor ? "border-none" : "border-dashed",
        )}
        style={{ backgroundColor: currentColor }}
        onClick={() => onChange("")}
        disabled={isLoading}
      >
        <div className="h- flex w-full items-center gap-4 overflow-hidden">
          <div className="w-fit text-[50px] leading-none">{value}</div>
          <div className="z-50 truncate text-xl font-bold text-foreground">
            {currentName}
          </div>
        </div>
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute -right-2 -top-2 h-fit w-fit rounded-full p-1 group-hover:bg-primary",
          )}
        >
          <X className="h-3 w-3 text-primary group-hover:scale-105 group-hover:text-primary-foreground" />
        </div>
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={cn(
            "group flex h-20 w-full items-center justify-start gap-4 rounded-md border-none px-4",
            !currentColor && "border-dashed",
          )}
          style={{ backgroundColor: currentColor }}
        >
          <SmilePlus
            size={50}
            className="invert"
            style={{ color: currentColor ? currentColor : "#737373" }}
          />
          <div className="z-50 truncate text-xl font-bold text-foreground">
            {currentName}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="w-[300px] border p-1 md:w-[350px]"
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          dynamicWidth={true}
          theme={translateTheme(theme)}
          className="w-full rounded-md "
          previewPosition="none"
        />
      </PopoverContent>
    </Popover>
  );
};
