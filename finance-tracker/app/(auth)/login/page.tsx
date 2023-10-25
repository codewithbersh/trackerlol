import { getCurrentUser } from "@/actions/get-current-user";

import { UserAuthForm } from "@/components/auth/user-auth-form";
import { Logo } from "@/components/logo";
import { Wallet2 } from "lucide-react";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const user = await getCurrentUser();
  if (user) {
    return redirect("/transactions");
  }

  return (
    <div className="flex flex-col space-y-4  rounded bg-background p-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative mx-auto w-fit">
          <div className="relative z-50 mx-auto w-fit rounded-full border-t bg-gradient-to-t from-background to-primary-foreground/50 p-1">
            <div className="rounded-full border-t bg-gradient-to-t from-background to-primary-foreground/50 p-1">
              <div className="rounded-full border-t bg-gradient-to-t from-background to-primary-foreground/50 p-2">
                <Logo className="h-6 w-6  md:h-8 md:w-8" />
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 z-0 hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-t from-brand/25 to-pink-500/25 blur-2xl dark:block" />
          <div className="absolute left-1/2 top-1/2 z-0 block h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-t from-background via-background to-pink-500/75 blur-2xl dark:hidden" />
        </div>

        <h1 className="text-center text-lg font-medium text-muted-foreground">
          Welcome
        </h1>
      </div>
      <UserAuthForm />
    </div>
  );
};

export default LoginPage;
