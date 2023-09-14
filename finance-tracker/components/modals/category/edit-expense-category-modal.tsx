"use client";

import { z } from "zod";
import { useEffect } from "react";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import useCategoryData from "@/hooks/use-category-data";
import { useEditExpenseStore } from "@/hooks/use-edit-expense-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectEmoji } from "@/components/select-emoji";
import { SelectColor } from "@/components/select-color";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CategoryFormSchema } from "./expense-category-modal";

export const EditExpenseCategoryModal = () => {
  const { refetch } = useCategoryData();
  const { isOpen, onClose, category } = useEditExpenseStore();

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      emoji: "",
      title: "",
      color: "",
    },
  });

  useEffect(() => {
    if (category) {
      form.reset(category);
    }
  }, [category]);

  const isLoading = form.formState.isSubmitting;

  if (!category) return null;

  const onSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {
    try {
      await axios.patch(`/api/categories/${category.id}`, {
        type: "EXPENSE",
        ...values,
      });
      toast.success("Category updated.");
      refetch();
      onClose();
      form.reset();
    } catch (error) {
      if (isAxiosError(error)) {
        error.response?.data === "Emoji has been used."
          ? form.setError("emoji", {
              type: "Emoji Already Exists",
              message: "Emoji already exists",
            })
          : toast.error("An error has occured.");
      }
      console.log("[UPDATE_CATEGORY_ERROR]", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <SelectEmoji
                    onChange={field.onChange}
                    value={field.value}
                    currentColor={category.color}
                    isLoading={isLoading}
                  />
                </FormControl>
                <FormLabel>Emoji</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
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
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <SelectColor
                    onChange={field.onChange}
                    value={field.value}
                    isLoading={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-1">
            <Button
              type="submit"
              className="w-full gap-2 items-center"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Category
            </Button>
            <Button variant="link">Delete Category</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
