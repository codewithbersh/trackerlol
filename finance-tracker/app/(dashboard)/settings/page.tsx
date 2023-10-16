import { getUserWithProfile } from "@/actions/get-user-with-profile";

import { PageHeading } from "@/components/page-heading";
import { FormSettings } from "@/components/forms/form-settings";

const SettingsPage = async () => {
  const { profile } = await getUserWithProfile();

  return (
    <div className="mt-[60px] flex  h-full flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Settings" />

      <div className="mt-8 h-full">
        <FormSettings profile={profile} />
      </div>
    </div>
  );
};

export default SettingsPage;
