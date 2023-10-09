import { PageHeading } from "@/components/page-heading";

import { FormSettings } from "@/components/forms/form-settings";

const SettingsPage = () => {
  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Settings" />

      <div className="mt-8">
        <FormSettings />
      </div>
    </div>
  );
};

export default SettingsPage;
