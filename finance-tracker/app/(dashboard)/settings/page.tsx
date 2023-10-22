import { getUserWithProfile } from "@/actions/get-user-with-profile";

import { PageHeading } from "@/components/page-heading";
import { FormSettings } from "@/components/forms/form-settings";
import { MainWrapper } from "@/components/main-wrapper";

const SettingsPage = async () => {
  const { profile } = await getUserWithProfile();

  return (
    <div className="mt-[60px] flex  h-full flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Settings" />

      <MainWrapper>
        <div className="h-full">
          <FormSettings profile={profile} />
        </div>
      </MainWrapper>
    </div>
  );
};

export default SettingsPage;
