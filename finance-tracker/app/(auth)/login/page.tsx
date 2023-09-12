import { getCurrentUser } from "@/actions/get-current-user";
import { redirect } from "next/navigation";

import { UserAuthForm } from "@/components/auth/user-auth-form";

const LoginPage = async () => {
  const user = await getCurrentUser();
  if (user) return redirect("/transactions");
  return (
    <div className="bg-primary-foreground rounded p-8 flex flex-col space-y-4">
      <h1 className="text-lg font-medium text-center">Welcome back</h1>
      <UserAuthForm />
    </div>
  );
};

export default LoginPage;
