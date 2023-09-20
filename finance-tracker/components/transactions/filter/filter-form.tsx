import { useRouter, useSearchParams } from "next/navigation";
import { useFilterTransactionsStore } from "@/hooks/use-filter-transactions";
import queryString from "query-string";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  date: z
    .object({
      from: z.coerce.date().optional(),
      to: z.coerce.date().optional(),
    })
    .optional(),
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  category: z.string().optional(),
});

export const FilterForm = ({ categories }: { categories: Category[] }) => {
  const {
    onClose,
    dateQuery,
    setDateQuery,
    typeQuery,
    setTypeQuery,
    categoryQuery,
    setCategoryQuery,
  } = useFilterTransactionsStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: dateQuery,
      type: typeQuery,
      category: categoryQuery,
    },
  });

  React.useEffect(() => {
    if (dateQuery || typeQuery) {
      form.reset({ date: dateQuery, type: typeQuery });
    }
  }, [form, dateQuery, typeQuery]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const query = queryString.parse(searchParams.toString());
    query.from =
      values.date && values.date.from
        ? format(values.date.from, "yyy-MM-dd")
        : null;
    query.to =
      values.date && values.date.to
        ? format(values.date.to, "yyy-MM-dd")
        : null;
    query.category = values.category ? values.category : null;

    query.type = values.type ? values.type.toLowerCase() : null;

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    //@ts-ignore
    setDateQuery(values.date);

    setTypeQuery(values.type);
    setCategoryQuery(values.category);

    router.push(url);
    onClose();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-12">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd")}—{" "}
                            {format(field.value.to, "LLL dd")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd")
                        )
                      ) : (
                        <span>Select dates</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    //@ts-ignore
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    numberOfMonths={2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="EXPENSE" />
                    </FormControl>
                    <FormLabel className="font-normal">Expense</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="INCOME" />
                    </FormControl>
                    <FormLabel className="font-normal">Income</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {categories.map((category) => (
                    <FormItem
                      key={category.id}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={category.slug} />
                      </FormControl>
                      <FormLabel
                        className="flex gap-2 px-2 py-1 rounded-sm text-primary-foreground"
                        style={{ backgroundColor: category.color }}
                      >
                        <span>{category.emoji}</span>
                        <span>{category.title}</span>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Apply Filters</Button>
      </form>
    </Form>
  );
};
