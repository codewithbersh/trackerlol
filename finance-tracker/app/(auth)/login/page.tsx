import { getCurrentUser } from "@/actions/get-current-user";
import { redirect } from "next/navigation";

import { UserAuthForm } from "@/components/auth/user-auth-form";
import { Wallet2 } from "lucide-react";

const LoginPage = async () => {
  const user = await getCurrentUser();
  if (user) return redirect("/transactions");
  return (
    <div className="bg-background rounded p-8  flex flex-col space-y-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <Wallet2 />
        <h1 className="text-lg font-semibold text-center">Welcome</h1>
      </div>
      <UserAuthForm />
    </div>
  );
};

export default LoginPage;
