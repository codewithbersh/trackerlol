"use client";

import { cn } from "@/lib/utils";
import "react-circular-progressbar/dist/styles.css";
import {
  CircularProgressbar as ProgressBar,
  buildStyles,
} from "react-circular-progressbar";
import { ProgressProvider } from "./progress-provider";

interface CircularProgressbarProps {
  value: number;
  className: string;
  pathColor: string;
  text?: string;
}

export const CircularProgressbar = ({
  value: valueEnd,
  className,
  pathColor,
  text,
}: CircularProgressbarProps) => {
  return (
    <ProgressProvider valueStart={0} valueEnd={valueEnd}>
      {(value: number) => (
        <ProgressBar
          value={value}
          className={cn("w-fit h-fit", className)}
          styles={buildStyles({ pathColor, trailColor: "#737373" })}
          text={text}
        />
      )}
    </ProgressProvider>
  );
};
