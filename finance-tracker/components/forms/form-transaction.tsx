"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TransactionWithAmountAsNumber } from "@/types/types";
import { useTransactionModal } from "@/hooks/use-transaction-modal";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldCategory } from "./field-category";
import { FieldType } from "./field-type";
import { FieldAmount } from "./field-amount";

const FormSchema = z.object({
  type: z.enum(["EXPENSE", "INCOME"]),
  amount: z.coerce.number().min(1),
  note: z.string(),
  date: z.coerce.date(),
  categoryId: z
    .string({
      required_error: "Please select a category.",
    })
    .nonempty("Please select a category"),
});

interface TransactionFormProps {
  initialData: TransactionWithAmountAsNumber | null;
}

export const FormTransaction = ({ initialData }: TransactionFormProps) => {
  const router = useRouter();
  const { onClose } = useTransactionModal();

  const buttonText = initialData ? "Save Changes" : "Add Transaction";
  const toastSuccessMessage = initialData
    ? "Transaction Updated"
    : "Transaction Added";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      type: "EXPENSE",
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
          date: format(values.date, "yyyy-MM-dd'T'HH:mm:ss'.000Z'"),
        });
      } else {
        await axios.post("/api/transactions", {
          ...values,
          date: format(values.date, "yyyy-MM-dd'T'HH:mm:ss'.000Z'"),
        });
      }

      toast.success(toastSuccessMessage);
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("An error has occured.");
      console.log("[ADD_TRANSACTION_ERROR]", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      toast.success("Transaction has been deleted.");
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("An error has occured.");
      console.log("[DELETE_TRANSACTION_ERROR]", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full pt-8 grid grid-cols-2 gap-y-8 gap-x-4"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormControl>
                <FieldType
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    form.setValue("categoryId", "");
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <FieldAmount
                  onValueChange={field.onChange}
                  value={field.value}
                  decimalScale={2}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel className="w-fit">Note</FormLabel>
              <FormControl>
                <Input placeholder="Add note" {...field} disabled={isLoading} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full col-span-full sm:col-span-1">
              <FormLabel className="w-fit">Category</FormLabel>
              <FieldCategory
                selectedType={form.watch("type")}
                onChange={field.onChange}
                value={field.value}
                isLoading={isLoading}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col col-span-full sm:col-span-1">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="secondary"
                      className={cn(
                        "w-full pl-3 text-left font-normal border-input border",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isLoading}
                    >
                      {field.value ? (
                        format(field.value, "MMMM dd")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
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
            </FormItem>
          )}
        />
        <div className="col-span-full flex mt-6 items-center gap-4 ">
          {initialData && (
            <Button
              variant="outlineDestructive"
              type="button"
              onClick={() => handleDelete(initialData.id)}
            >
              Delete
            </Button>
          )}
          <Button
            variant="ghost"
            type="button"
            onClick={onClose}
            className="ml-auto"
          >
            Cancel
          </Button>
          <Button type="submit" className="w-fit" disabled={isLoading}>
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
