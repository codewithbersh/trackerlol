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

interface SelectEmojiProps {
  onChange: (value: string) => void;
  value: string;
  currentColor: string;
}

export const SelectEmoji = ({
  onChange,
  value,
  currentColor,
}: SelectEmojiProps) => {
  const { theme } = useTheme();

  if (value) {
    return (
      <Button
        variant="outline"
        className="w-20 h-20 grid place-items-center rounded-md relative group"
        style={{ backgroundColor: currentColor }}
        onClick={() => onChange("")}
      >
        <div className=" text-[60px] leading-none w-fit">{value}</div>
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-fit h-fit absolute right-0 top-0 rounded-full p-1 -translate-y-2 translate-x-2 group-hover:bg-white"
          )}
        >
          <X className="w-3 h-3 group-hover:text-black group-hover:scale-105" />
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
          <SmilePlus
            size={60}
            className="text-muted-foreground group-hover:text-foreground"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="w-[300px] md:w-[350px] border p-0"
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          dynamicWidth={true}
          theme={translateTheme(theme)}
          className="w-full"
          previewPosition="none"
        />
      </PopoverContent>
    </Popover>
  );
};
