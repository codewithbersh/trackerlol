"use client";

import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/app/_trpc/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldEmoji } from "./field-emoji";
import { FieldType } from "./field-type";
import { FieldColor } from "./field-color";

export const CategoryFormSchema = z.object({
  type: z.enum(["EXPENSE", "INCOME"]),
  emoji: z.string({ required_error: "Choose an emoji" }).min(1),
  title: z.string().min(1),
  color: z.string().min(1),
});

export const FormCategory = () => {
  const utils = trpc.useUtils();
  const { onClose, category: initialData } = useCategoryModal();
  const { data: categories, refetch } = trpc.category.get.useQuery(undefined, {
    staleTime: Infinity,
  });
  const { refetch: refetchGetCategoriesByCount } =
    trpc.category.getByCount.useQuery(
      {},
      {
        staleTime: Infinity,
      },
    );
  const { mutate: addCategory, isLoading: isAdding } =
    trpc.category.add.useMutation();
  const { mutate: updateCategory, isLoading: isUpdating } =
    trpc.category.update.useMutation();
  const { mutate: deleteCategory, isLoading: isDeleting } =
    trpc.category.delete.useMutation();

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: initialData || {
      type: "EXPENSE",
      emoji: "",
      title: "",
      color: "",
    },
  });

  const isLoading =
    form.formState.isSubmitting || isAdding || isUpdating || isDeleting;
  const currentColor = form.watch("color");
  const currentName = form.watch("title");
  const buttonText = initialData ? "Save Category" : "Add Category";

  const onSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {
    if (initialData) {
      updateCategory(
        { ...values, id: initialData.id },
        {
          onSuccess: ({ code, message }) => {
            if (code === 200) {
              toast.success(message);
              utils.category.get.invalidate();
              utils.category.getByCount.invalidate();
              refetch();
              refetchGetCategoriesByCount();
              onClose();
            } else {
              toast.error(message);
            }
          },
        },
      );
    } else {
      addCategory(values, {
        onSuccess: ({ code, message }) => {
          if (code === 200) {
            toast.success(message);
            utils.category.get.invalidate();
            utils.category.getByCount.invalidate();
            refetch();
            refetchGetCategoriesByCount();
            onClose();
          } else {
            toast.error(message);
          }
        },
      });
    }
  };

  const handleDelete = async (id: string) => {
    deleteCategory(
      { id },
      {
        onSuccess: ({ code, message }) => {
          if (code === 200) {
            toast.success(message);
            onClose();
            utils.category.get.invalidate();
            utils.category.getByCount.invalidate();
            refetch();
            refetchGetCategoriesByCount();
          } else {
            toast.error(message);
          }
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-8 pt-8 sm:grid-cols-2"
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
                    form.setValue("color", "");
                  }}
                  disabled={isLoading || initialData ? true : false}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Category name"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emoji"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-1">
              <FormLabel>Emoji</FormLabel>
              <FormControl>
                <FieldEmoji
                  currentName={currentName}
                  onChange={field.onChange}
                  value={field.value}
                  currentColor={currentColor}
                  isLoading={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-1">
              <FormLabel>Color</FormLabel>
              <FormControl>
                <FieldColor
                  categories={
                    form.watch("type") === "EXPENSE"
                      ? categories?.filter(
                          (category) => category.type === "EXPENSE",
                        )
                      : categories?.filter(
                          (category) => category.type === "INCOME",
                        )
                  }
                  onChange={field.onChange}
                  value={field.value}
                  type={form.watch("type")}
                  isLoading={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-full mt-6 flex w-full gap-4">
          {initialData && (
            <Button
              className=""
              variant="outline-destructive"
              type="button"
              onClick={() => handleDelete(initialData.id)}
              disabled={isLoading}
            >
              Delete
            </Button>
          )}
          <Button
            className=" ml-auto"
            variant="ghost"
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-fit items-center gap-2"
            disabled={isLoading}
          >
            {(form.formState.isSubmitting || isAdding || isUpdating) && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
