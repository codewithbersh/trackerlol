import { PageHeading } from "@/components/page-heading";
import { MainWrapper } from "@/components/main-wrapper";
import { Settings } from "./_components/settings";

const SettingsPage = () => {
  return (
    <div className="mt-[60px] flex  h-full flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Settings" />

      <MainWrapper>
        <div className="h-full">
          <Settings />
        </div>
      </MainWrapper>
    </div>
  );
};

export default SettingsPage;
