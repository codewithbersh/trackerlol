"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Profile } from "@prisma/client";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormLabelGroup,
  FormLabelHeader,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { FieldTheme } from "./field-theme";
import { FieldCurrency } from "./field-currency";

const FormSchema = z.object({
  currency: z.string(),
  thousandsGroupStyle: z.string(),
});

interface FormSettingsProps {
  profile: Profile | null;
}

export const FormSettings = ({ profile: initialData }: FormSettingsProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      currency: "USD",
      thousandsGroupStyle: "en-US",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/profile/${initialData.id}`, values);
      } else {
        await axios.post("/api/profile", values);
      }
    } catch (error) {
      console.log("[FORM_SETTINGS_ERROR]", error);
    } finally {
      window.location.reload();
    }
  };

  const { isDirty, dirtyFields } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full  w-full space-y-6 lg:relative"
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

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabelGroup>
                    <FormLabelHeader>Currency</FormLabelHeader>
                    <FormLabel>Select your currency below.</FormLabel>
                  </FormLabelGroup>
                  <FieldCurrency
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {isDirty && (
          <div className="absolute bottom-4 right-1/2 flex min-w-[220px] translate-x-[50%] gap-4 rounded-md bg-secondary p-2 lg:bottom-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="shrink-0">
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
