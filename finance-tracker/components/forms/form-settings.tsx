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
  FormLabelGroup,
  FormLabelHeader,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { FieldTheme } from "./field-theme";

const FormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
});

export const FormSettings = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  space-y-6"
      >
        <div className="flex flex-col gap-2">
          <div>General</div>
          <Separator className="bg-border/50" />

          <div className="mx-auto mt-8 w-full max-w-lg space-y-6">
            <div className="space-y-4">
              <FormLabelGroup>
                <FormLabelHeader>Appearance</FormLabelHeader>
                <FormLabel>Select your preferred theme.</FormLabel>
              </FormLabelGroup>
              <FieldTheme />
            </div>
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
