import { getCurrentUser } from "@/actions/get-current-user";
import React from "react";
import { redirect } from "next/navigation";

const TestPage = async () => {
  const user = await getCurrentUser();
  return <div>TestPage</div>;
};

export default TestPage;
