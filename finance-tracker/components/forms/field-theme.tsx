"use client";

import { THEMES } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldThemeLoading } from "@/components/field-theme-loading";

export const FieldTheme = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <FieldThemeLoading />;

  const onValueChange = (value: "light" | "dark" | "system") => {
    setTheme(value);
  };

  return (
    <RadioGroup
      onValueChange={onValueChange}
      defaultValue={theme ? theme : "system"}
      className="flex flex-col gap-4"
    >
      {THEMES.map(({ value, label, icon: Icon }) => (
        <Label
          key={value}
          className="flex w-full cursor-pointer items-center justify-between rounded-sm border p-2 hover:bg-accent/20"
          htmlFor={value}
        >
          <div className="flex items-center gap-4">
            <div className="rounded bg-accent/50 p-2">
              <Icon className="h-4 w-4" />
            </div>
            <div>{label}</div>
          </div>
          <RadioGroupItem value={value} id={value} />
        </Label>
      ))}
    </RadioGroup>
  );
};
