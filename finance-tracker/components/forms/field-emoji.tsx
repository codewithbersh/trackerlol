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
}

export const FieldEmoji = ({
  onChange,
  value,
  currentColor,
  isLoading,
}: FieldEmojiProps) => {
  const { theme } = useTheme();

  if (value) {
    return (
      <Button
        variant="outline"
        className="w-20 h-20 grid place-items-center  relative group rounded-full"
        style={{ backgroundColor: currentColor }}
        onClick={() => onChange("")}
        disabled={isLoading}
      >
        <div className=" text-[50px] leading-none w-fit">{value}</div>
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-fit h-fit absolute right-0 top-0 rounded-full p-1 -translate-y-0.5 translate-x-0.5 group-hover:bg-primary bg-muted"
          )}
        >
          <X className="w-3 h-3 group-hover:text-primary-foreground text-primary group-hover:scale-105" />
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
          className="mx-auto border-dashed w-20 h-20 group"
          style={{ backgroundColor: currentColor }}
        >
          <SmilePlus size={50} className="text-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="w-[300px] md:w-[350px] border p-1"
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          dynamicWidth={true}
          theme={translateTheme(theme)}
          className="w-full rounded-full bg-red-500"
          previewPosition="none"
        />
      </PopoverContent>
    </Popover>
  );
};
