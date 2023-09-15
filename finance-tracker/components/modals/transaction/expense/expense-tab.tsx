"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { CategorySelect } from "./category-select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InputNumber } from "@/components/input-number";

const FormSchema = z.object({
  amount: z.coerce.number().min(1),
  note: z.string(),
  date: z.coerce.date(),
  category: z
    .string({
      required_error: "Please select a category.",
    })
    .nonempty("Please select a category"),
});

export const ExpenseTab = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      category: "",
      note: "",
      date: new Date(),
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  return (
    <TabsContent value="expense">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full pt-8 flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex sm:col-span-full">
                <div className="flex items-start mx-auto">
                  <FormLabel className="translate-y-3 font-bold sm:text-base">
                    QAR
                  </FormLabel>
                  <FormControl>
                    <InputNumber
                      onValueChange={field.onChange}
                      value={field.value}
                      decimalScale={2}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="sm:col-span-full">
                <FormLabel className="w-fit">Note</FormLabel>

                <FormControl>
                  <Input placeholder="Add note" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="w-fit">Category</FormLabel>
                <CategorySelect onChange={field.onChange} value={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col col-span-1">
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
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-full">
            Add Transaction
          </Button>
        </form>
      </Form>
    </TabsContent>
  );
};
