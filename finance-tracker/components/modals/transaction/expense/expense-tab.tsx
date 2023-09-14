"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { CategorySelect } from "./category-select";

const FormSchema = z.object({
  category: z
    .string({
      required_error: "Please select a category.",
    })
    .nonempty("Please select a category"),
});

export const ExpenseTab = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  return (
    <TabsContent value="expense">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full py-8"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="w-fit">Category</FormLabel>
                <CategorySelect onChange={field.onChange} value={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Transaction</Button>
        </form>
      </Form>
    </TabsContent>
  );
};
