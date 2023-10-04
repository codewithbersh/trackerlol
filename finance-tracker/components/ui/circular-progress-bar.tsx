"use client";

import { cn } from "@/lib/utils";
import "react-circular-progressbar/dist/styles.css";
import {
  CircularProgressbar as ProgressBar,
  buildStyles,
} from "react-circular-progressbar";

import { CircularProgressBarProvider } from "@/components/providers/circular-progress-bar-provider";

interface CircularProgressBarProps {
  value: number;
  className: string;
  pathColor: string;
  text?: string;
}

export const CircularProgressBar = ({
  value: valueEnd,
  className,
  pathColor,
  text,
}: CircularProgressBarProps) => {
  return (
    <CircularProgressBarProvider valueStart={0} valueEnd={valueEnd}>
      {(value: number) => (
        <ProgressBar
          value={value}
          className={cn("h-fit w-fit ", className)}
          styles={buildStyles({ pathColor, trailColor: "#262626" })}
          text={text}
        />
      )}
    </CircularProgressBarProvider>
  );
};
