"use client";

import { Shapes } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { toTitleCase } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";

export const FilterType = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type")?.toLowerCase();
  const router = useRouter();
  const [value, setValue] = useState<string | undefined>(undefined);

  const isTypeValid =
    type && (type === "income" || type === "expense") ? true : false;

  const onValueChange = (value: string) => {
    const current = queryString.parse(searchParams.toString());
    const query = {
      ...current,
      type: value.toLowerCase(),
    };

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        setValue(value);
        onValueChange(value);
      }}
    >
      <SelectTrigger className=" w-full justify-start gap-2">
        <div className="flex items-center gap-2 leading-none">
          <Shapes className="h-4 w-4 opacity-50" />
          {type ? toTitleCase(type) : "Type"}
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="expense">Expense</SelectItem>
        <SelectItem value="income">Income</SelectItem>
      </SelectContent>
    </Select>
  );
};
