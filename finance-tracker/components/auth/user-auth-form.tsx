"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
});

export const UserAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const signInResult = await signIn("email", {
      email: values.email.toLocaleLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("callbackUrl") || "/transactions",
    });

    setIsLoading(false);

    // update later
    if (!signInResult?.ok) {
      return console.log("[LOGIN_ERROR]");
    }

    return console.log("[EMAIL SENT]");
  }

  return (
    <div className="min-w-[350px] space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input placeholder="hello@brucesalcedo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full gap-2 items-center"
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in with email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google", { callbackUrl: "/transactions" });
        }}
        variant="outline"
        className="w-full gap-2 items-center"
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        Continue with Google
      </Button>
    </div>
  );
};
