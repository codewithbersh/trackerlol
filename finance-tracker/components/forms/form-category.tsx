"use client";

import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import axios, { isAxiosError } from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import useCategoryData from "@/hooks/use-category-data";

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
import { FieldColorTest } from "./field-color-test";
import { FieldType } from "./field-type";

export const CategoryFormSchema = z.object({
  type: z.enum(["EXPENSE", "INCOME"]),
  emoji: z
    .string({ required_error: "Choose an emoji" })
    .nonempty("Choose an emoji"),
  title: z.string().nonempty(),
  color: z.string().nonempty(),
});

export const FormCategory = () => {
  const { isOpen, onClose } = useCategoryModal();
  const { data: categories } = useCategoryData();

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      type: "EXPENSE",
      emoji: "",
      title: "",
      color: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const currentColor = form.watch("color");

  async function onSubmit(values: z.infer<typeof CategoryFormSchema>) {
    try {
      await axios.post("/api/categories", values);
      toast.success("Category added.");
      onClose();
      form.reset();
    } catch (error) {
      if (isAxiosError(error)) {
        error.response?.data === "Emoji has been used."
          ? form.setError("emoji", {
              type: "Emoji Already Exists",
              message: "Emoji already exists",
            })
          : error.response?.data === "Color has been used."
          ? form.setError("color", { message: "Color already exists." })
          : toast.error("An error has occured.");
        console.log(error.response?.data);
      }
      console.log("[ADD_CATEGORY_ERROR]", error);
    }
  }

  if (!categories) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FieldType
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    form.setValue("color", "");
                  }}
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
            <FormItem className="flex flex-col items-center">
              <FormControl>
                <FieldEmoji
                  onChange={field.onChange}
                  value={field.value}
                  currentColor={currentColor}
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
                <FieldColorTest
                  categories={
                    form.watch("type") === "EXPENSE"
                      ? categories.expense
                      : categories.income
                  }
                  onChange={field.onChange}
                  value={field.value}
                  type={form.watch("type")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full gap-2 items-center"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Add Category
        </Button>
      </form>
    </Form>
  );
};
