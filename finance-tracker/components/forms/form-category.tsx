"use client";

import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import axios, { isAxiosError } from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import useCategoryData from "@/hooks/use-category-data";
import { useRouter } from "next/navigation";

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
  emoji: z
    .string({ required_error: "Choose an emoji" })
    .nonempty("Choose an emoji"),
  title: z.string().nonempty(),
  color: z.string().nonempty(),
});

export const FormCategory = () => {
  const { onClose, category: initialData } = useCategoryModal();
  const { data: categories, refetch } = useCategoryData();
  const router = useRouter();

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: initialData || {
      type: "EXPENSE",
      emoji: "",
      title: "",
      color: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const currentColor = form.watch("color");
  const currentName = form.watch("title");
  const buttonText = initialData ? "Save Category" : "Add Category";

  async function onSubmit(values: z.infer<typeof CategoryFormSchema>) {
    try {
      if (initialData) {
        await axios.patch(`/api/categories/${initialData.id}`, values);
        toast.success("Category updated.");
      } else {
        await axios.post("/api/categories", values);
        toast.success("Category added.");
      }
      onClose();
      form.reset();
      refetch();
      router.refresh();
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

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      toast.success("Transaction has been deleted.");
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("An error has occured.");
      console.log("[DELETE_CATEGORY_ERROR]", error);
    }
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
                      ? categories?.expense
                      : categories?.income
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

        <div className="col-span-full mt-6 flex w-full gap-4">
          {initialData && (
            <Button
              className=""
              variant="outline-destructive"
              type="button"
              onClick={() => handleDelete(initialData.id)}
            >
              Delete
            </Button>
          )}
          <Button
            className=" ml-auto"
            variant="ghost"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-fit items-center gap-2"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
