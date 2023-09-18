"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useTransactionModal } from "@/hooks/use-transaction-modal";
import { useRouter } from "next/navigation";
import { TransactionWithAmountAsNumber } from "@/types/types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  categoryId: z
    .string({
      required_error: "Please select a category.",
    })
    .nonempty("Please select a category"),
});

interface ExpenseFormProps {
  initialData?: TransactionWithAmountAsNumber;
}

export const ExpenseForm = ({ initialData }: ExpenseFormProps) => {
  const { onClose } = useTransactionModal();
  const router = useRouter();

  const buttonText = initialData ? "Save Changes" : "Add Transaction";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData
      ? { ...initialData, amount: parseFloat(String(initialData.amount)) }
      : {
          amount: 0,
          categoryId: "",
          note: "",
          date: new Date(),
        },
    mode: "onChange",
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/transactions/${initialData.id}`, {
          ...values,
          type: "EXPENSE",
          date: format(values.date, "yyyy-MM-dd'T'HH:mm:ss'.000Z'"),
        });
        toast.success("Transaction updated.");
        router.refresh();
        router.back();
      } else {
        await axios.post("/api/transactions", {
          ...values,
          type: "EXPENSE",
          date: format(values.date, "yyyy-MM-dd'T'HH:mm:ss'.000Z'"),
        });
        toast.success("New transaction added.");
        router.refresh();
        onClose();
      }

      form.reset({
        amount: 0,
        categoryId: undefined,
        note: undefined,
        date: undefined,
      });
    } catch (error) {
      toast.error("An error has occured.");
      console.log("[ADD_TRANSACTION_ERROR]", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full pt-8 flex flex-col gap-6"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex sm:col-span-full">
              <div className="flex items-start mx-auto">
                <FormLabel className="translate-y-3 font-bold sm:text-base">
                  USD
                </FormLabel>
                <FormControl>
                  <InputNumber
                    onValueChange={field.onChange}
                    value={field.value}
                    decimalScale={2}
                    disabled={isLoading}
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
                <Input placeholder="Add note" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="w-fit">Category</FormLabel>
              <CategorySelect
                onChange={field.onChange}
                value={field.value}
                isLoading={isLoading}
              />
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
                      disabled={isLoading}
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
        <Button type="submit" className="col-span-full" disabled={isLoading}>
          {buttonText}
        </Button>
      </form>
    </Form>
  );
};
