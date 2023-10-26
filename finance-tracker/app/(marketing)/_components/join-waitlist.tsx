"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().min(1),
});

export const JoinWaitlist = () => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isLoading } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      axios.post("/api/waitlist", values);
    } catch (error) {
      toast.error("An error has occured.");
    } finally {
      setShowSuccess(true);
      confetti({
        particleCount: 200,
        spread: 360,
        origin: { y: 0.4 },
      });
    }
  };

  if (showSuccess) {
    return (
      <div className="grid h-10 place-items-center text-center text-sm text-green-500">
        You&apos;ve been added to the waitlist. ✨
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative  w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  className="rounded-full pr-10 focus-visible:ring-brand"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          className="absolute right-1 top-1  h-8 w-8 rounded-full"
        >
          {isLoading ? (
            <Loader2 className="absolute h-4 w-4 animate-spin text-brand" />
          ) : (
            "✨"
          )}
        </Button>
      </form>
    </Form>
  );
};
