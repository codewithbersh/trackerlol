"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCategoryBudget } from "@/hooks/use-category-budget-modal";
import { Loader2 } from "lucide-react";
import { trpc } from "@/app/_trpc/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FieldAmount } from "./field-amount";
import { FieldTimeFrame } from "./field-time-frame";
import { FieldWeekStartDay } from "./field-week-start-day";
import { FieldMonthStartDate } from "./field-month-start-date";
import { FieldYearStartDate } from "./field-year-start-date";
import { FieldCategory } from "./field-category";

const defaultProps = z.object({
  limit: z.coerce.number(),
  duration: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  categoryId: z.string(),
});

const dailySchema = z.object({
  duration: z.literal("DAILY"),
});

const weeklySchema = z.object({
  duration: z.literal("WEEKLY"),
  weekStartDay: z.enum([
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ]),
});

const monthlySchema = z.object({
  duration: z.literal("MONTHLY"),
  monthStartDate: z.string().nonempty(),
});

const yearlySchema = z.object({
  duration: z.literal("YEARLY"),
  yearStartDate: z.coerce.date(),
});

const schemaCond = z.discriminatedUnion("duration", [
  dailySchema,
  weeklySchema,
  monthlySchema,
  yearlySchema,
]);

const formSchema = z.intersection(schemaCond, defaultProps);

export const FormCategoryBudget = () => {
  const { onClose, budget: initialData } = useCategoryBudget();
  const utils = trpc.useUtils();

  const { data: categories } = trpc.category.get.useQuery(undefined, {
    staleTime: Infinity,
  });
  const { data: categoryBudgets, refetch: refetchCategoryBudgets } =
    trpc.budget.categories.getAll.useQuery(undefined, {
      staleTime: Infinity,
    });
  const { data: profile } = trpc.profile.get.useQuery(undefined, {
    staleTime: Infinity,
  });
  const { refetch: refetchCategoriesBudgets } =
    trpc.budget.categories.getAll.useQuery(undefined, {
      staleTime: Infinity,
    });

  const { mutate: addCategoryBudget } =
    trpc.budget.categories.add.useMutation();
  const { mutate: updateCategoryBudget } =
    trpc.budget.categories.update.useMutation();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    defaultValues: initialData
      ? {
          ...initialData,
          monthStartDate: initialData.monthStartDate?.toString(),
        }
      : {
          duration: "MONTHLY",
        },
  });

  const selectedDuration = form.watch("duration");
  const buttonText = initialData ? "Save Changes" : "Add Budget";
  const isLoading = form.formState.isSubmitting;
  const filteredCategories = categories?.filter(
    (category) =>
      !categoryBudgets?.some((budget) => budget.categoryId === category.id),
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      updateCategoryBudget(
        { ...values, id: initialData.id },
        {
          onSuccess: ({ code, message }) => {
            if (code === 200) {
              utils.transaction.getTotal.invalidate({
                categoryId: values.categoryId,
              });
              toast.success(message);
              refetchCategoriesBudgets();
              onClose();
            } else {
              toast.error(message);
            }
          },
        },
      );
    } else {
      addCategoryBudget(values, {
        onSuccess: ({ code, message }) => {
          if (code === 200) {
            toast.success(message);
            refetchCategoriesBudgets();
            onClose();
          } else {
            toast.error(message);
          }
        },
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/category-budgets/${id}`);
      toast.success("Budget has been deleted.");
      refetchCategoryBudgets();
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("An error has occured.");
      console.log("[DELETE_BUDGET_ERROR]", error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="text-lg font-semibold leading-none">
          Category Budget
        </div>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <FieldCategory
                  categories={
                    initialData ? [initialData.category] : filteredCategories
                  }
                  value={field.value}
                  onChange={field.onChange}
                  selectedType="EXPENSE"
                  isLoading={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="limit"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Limit</FormLabel>
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
          name="duration"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <FieldTimeFrame
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    form.resetField("weekStartDay");
                    form.resetField("monthStartDate");
                    form.resetField("yearStartDate");
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {selectedDuration === "WEEKLY" && (
          <FormField
            control={form.control}
            name="weekStartDay"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Day of Week</FormLabel>
                <FormControl>
                  <FieldWeekStartDay
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        {selectedDuration === "MONTHLY" && (
          <FormField
            control={form.control}
            name="monthStartDate"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Date of Month</FormLabel>
                <FormControl>
                  <FieldMonthStartDate
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        {selectedDuration === "YEARLY" && (
          <FormField
            control={form.control}
            name="yearStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Year</FormLabel>
                <FieldYearStartDate
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />
        )}

        <div className="flex w-full gap-4 pt-4">
          {initialData && (
            <Button
              variant="outline-destructive"
              type="button"
              onClick={() => handleDelete(initialData.id)}
              disabled={isLoading}
            >
              Delete
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            className="ml-auto"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} className="gap-2">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
