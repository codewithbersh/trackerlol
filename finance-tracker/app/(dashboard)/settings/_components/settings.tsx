"use client";

import { trpc } from "@/app/_trpc/client";
import { FormSettings } from "@/components/forms/form-settings";

export const Settings = () => {
  const { data: profile } = trpc.profile.get.useQuery();

  if (typeof profile === "undefined") {
    return null;
  }

  return (
    <>
      <FormSettings profile={profile} />
    </>
  );
};
