"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import { TransactionWithAmountAsNumber } from "@/types/types";
import { useTransactionModal } from "@/hooks/use-transaction-modal";
import { Loader2 } from "lucide-react";
import { trpc } from "@/app/_trpc/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldCategory } from "./field-category";
import { FieldType } from "./field-type";
import { FieldAmount } from "./field-amount";
import { FieldTransactionDate } from "./field-transaction-date";
import { getQueryKey } from "@trpc/react-query";

const FormSchema = z.object({
  type: z.enum(["EXPENSE", "INCOME"]),
  amount: z.coerce.number().min(1),
  note: z.string(),
  date: z.coerce.date(),
  categoryId: z
    .string({
      required_error: "Please select a category.",
    })
    .min(1),
});

interface TransactionFormProps {
  initialData: TransactionWithAmountAsNumber | null;
}

export const FormTransaction = ({ initialData }: TransactionFormProps) => {
  const { onClose } = useTransactionModal();
  const { refetch: refetchTransactions } = trpc.transaction.getAll.useQuery(
    {},
    {
      staleTime: Infinity,
    },
  );
  const { data: categories, isLoading: isLoadingCategories } =
    trpc.category.get.useQuery(undefined, {
      staleTime: Infinity,
    });
  const { data: profile } = trpc.profile.get.useQuery(undefined, {
    staleTime: Infinity,
  });

  const { mutate: addTransaction, isLoading: isAdding } =
    trpc.transaction.add.useMutation();
  const { mutate: updateTransaction, isLoading: isUpdating } =
    trpc.transaction.update.useMutation();
  const { mutate: deleteTransaction, isLoading: isDeleting } =
    trpc.transaction.delete.useMutation();
  const utils = trpc.useUtils();

  const buttonText = initialData ? "Save Changes" : "Add Transaction";

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

  const isLoading = isAdding || isUpdating || isDeleting;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const date = new Date(values.date.toLocaleDateString());

    if (initialData) {
      updateTransaction(
        { ...values, date, id: initialData.id },
        {
          onSuccess: ({ success }) => {
            if (success) {
              refetchTransactions();
              utils.transaction.getTotal.invalidate({
                categoryId: values.categoryId,
              });
              utils.budget.overall.invalidate();
              onClose();
              toast.success("Transaction Updated ");
            } else {
              toast("An error has occured.");
            }
          },
        },
      );
    } else {
      addTransaction(
        { ...values, date },
        {
          onSuccess: ({ success }) => {
            if (success) {
              refetchTransactions();
              utils.transaction.getTotal.invalidate({
                categoryId: values.categoryId,
              });
              utils.budget.overall.invalidate();
              toast.success("Transaction Added.");
              onClose();
            } else {
              toast.error("An error has occured.");
            }
          },
        },
      );
    }
  };

  const handleDelete = async (id: string, categoryId: string) => {
    deleteTransaction(
      { id },
      {
        onSuccess: ({ success }) => {
          if (success) {
            refetchTransactions();
            utils.transaction.getTotal.invalidate({
              categoryId,
            });
            utils.budget.overall.invalidate();
            onClose();
            toast.success("Transaction has been deleted.");
          } else {
            toast.error("An error has occured.");
          }
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-2 gap-x-4 gap-y-8 pt-8"
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
                    form.resetField("categoryId");
                    form.setValue("categoryId", "");
                  }}
                  disabled={isLoading}
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
                  disabled={isLoading}
                  thousandsGroupStyle={profile?.thousandsGroupStyle}
                  currency={profile?.currency}
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
            <FormItem className="col-span-full flex w-full flex-col sm:col-span-1">
              <FormLabel className="w-fit">Category</FormLabel>
              <FieldCategory
                categories={
                  form.watch("type") === "EXPENSE"
                    ? categories?.filter(
                        (category) => category.type === "EXPENSE",
                      )
                    : categories?.filter(
                        (category) => category.type === "INCOME",
                      )
                }
                selectedType={form.watch("type")}
                onChange={field.onChange}
                value={field.value}
                isLoading={isLoading}
                isLoadingCategories={isLoadingCategories}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="col-span-full flex flex-col sm:col-span-1">
              <FormLabel>Date</FormLabel>
              <FieldTransactionDate
                isLoading={isLoading}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />

        <div className="col-span-full mt-6 flex items-center gap-4 ">
          {initialData && (
            <Button
              type="button"
              onClick={() =>
                handleDelete(initialData.id, initialData.categoryId)
              }
              variant="outline-destructive"
              disabled={isLoading}
            >
              Delete
            </Button>
          )}
          <Button
            variant="ghost"
            type="button"
            onClick={onClose}
            className="ml-auto"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-fit gap-2" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
