"use client";

import { useCategoryModal } from "@/hooks/use-category-modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const formSchema = z.object({
  emoji: z.string().nonempty(),
  title: z.string().nonempty(),
  color: z.string().nonempty(),
});

export const ExpenseCategoryModal = () => {
  const { isOpen, onClose } = useCategoryModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emoji: "",
      title: "",
      color: "",
    },
  });

  const currentColor = form.watch("color");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onClose();
    form.reset();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="py-10 flex flex-col">
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
                  />
                </FormControl>
                <FormLabel>Emoji</FormLabel>
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
                  <Input placeholder="Category name" {...field} />
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
                  <SelectColor onChange={field.onChange} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Add Category
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
