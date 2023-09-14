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
import { SelectEmoji } from "@/components/select-emoji";
import { SelectColor } from "@/components/select-color";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export const CategoryFormSchema = z.object({
  emoji: z
    .string({ required_error: "Choose an emoji" })
    .nonempty("Choose an emoji"),
  title: z.string().nonempty(),
  color: z.string().nonempty(),
});

export const ExpenseCategoryModal = () => {
  const { isOpen, onClose } = useCategoryModal();
  const { refetch } = useCategoryData();

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      emoji: "",
      title: "",
      color: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const currentColor = form.watch("color");

  async function onSubmit(values: z.infer<typeof CategoryFormSchema>) {
    try {
      await axios.post("/api/categories", { type: "EXPENSE", ...values });
      toast.success("Category added.");
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
      console.log("[ADD_CATEGORY_ERROR]", error);
    }
  }

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
                  <SelectColor
                    onChange={field.onChange}
                    value={field.value}
                    isLoading={isLoading}
                  />
                </FormControl>
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
    </Modal>
  );
};