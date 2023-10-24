import { Benefits } from "./_components/benefits";
import { Features } from "./_components/features";
import { Hero } from "./_components/hero";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-48">
      <Hero />
      <Benefits />
      <Features />
    </div>
  );
};

export default HomePage;
