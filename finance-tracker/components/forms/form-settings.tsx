"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Profile } from "@prisma/client";
import { toast } from "sonner";
import { trpc } from "@/app/_trpc/client";

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
import { FieldThousandsGroupStyle } from "./field-thousands-group-style";
import { FieldDisplayCents } from "./field-display-cents";
import { FieldAccountOptions } from "./field-account-options";

const FormSchema = z.object({
  currency: z.string(),
  thousandsGroupStyle: z.string(),
  displayCents: z.boolean(),
});

interface FormSettingsProps {
  profile: Profile | null;
}

export const FormSettings = ({ profile: initialData }: FormSettingsProps) => {
  const utils = trpc.useUtils();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      currency: "USD",
      thousandsGroupStyle: "en-US",
      displayCents: true,
    },
  });

  const { mutate } = trpc.profile.add.useMutation();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    mutate(
      { ...values, id: initialData?.id },
      {
        onSuccess: ({ code, message }) => {
          if (code === 200) {
            utils.profile.get.invalidate();
            toast.success(message);
          } else {
            toast.error(message);
          }
        },
      },
    );
  };

  const { isSubmitting, isLoading, isDirty } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex  h-full w-full flex-col gap-6"
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

            <FormField
              control={form.control}
              name="displayCents"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabelGroup>
                    <FormLabelHeader>Number Format</FormLabelHeader>
                    <FormLabel>
                      Choose how you want the numbers to show.
                    </FormLabel>
                  </FormLabelGroup>
                  <FieldDisplayCents
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thousandsGroupStyle"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabelGroup>
                    <FormLabelHeader>Thousand Group Style</FormLabelHeader>
                    <FormLabel>
                      Define how you want to style thousands.
                    </FormLabel>
                  </FormLabelGroup>
                  <FieldThousandsGroupStyle
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mx-auto mt-8">
            <Button
              type="submit"
              size="sm"
              className="mx-auto shrink-0"
              disabled={isSubmitting || isLoading || !isDirty}
            >
              Save Changes
            </Button>
          </div>

          <div className="mt-16">Account</div>
          <Separator className="bg-border/50" />

          <div className="mx-auto mt-8 w-full max-w-lg space-y-6">
            <FormLabelGroup>
              <FormLabelHeader>Danger Zone</FormLabelHeader>
              <FormLabel>
                If you&apos;re unhappy with our app, you can delete and remove
                your account.
              </FormLabel>
            </FormLabelGroup>
            <FieldAccountOptions />
          </div>
        </div>
      </form>
    </Form>
  );
};
