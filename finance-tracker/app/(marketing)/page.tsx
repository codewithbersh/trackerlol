import { getCurrentUser } from "@/actions/get-current-user";

import { Benefits } from "./_components/benefits";
import { Features } from "./_components/features";
import { FinalCallToAction } from "./_components/final-call-to-action";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";

const HomePage = async () => {
  const user = await getCurrentUser();
  return (
    <div className="flex flex-col items-center justify-center gap-48">
      <Hero isAuthenticated={!!user} />
      <Benefits />
      <Features />
      <FinalCallToAction isAuthenticated={!!user} />
      <Footer />
    </div>
  );
};

export default HomePage;
