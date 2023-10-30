"use client";

import { trpc } from "@/app/_trpc/client";

import { FormSettings } from "@/components/forms/form-settings";
import { Spinner } from "@/components/spinner";

export const Settings = () => {
  const { data: profile, isLoading } = trpc.profile.get.useQuery(undefined, {
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Spinner className="py-12 md:py-24" />;
  }

  if (typeof profile === "undefined") {
    return null;
  }

  return (
    <>
      <FormSettings profile={profile} />
    </>
  );
};
