import { Benefits } from "./_components/benefits";
import { Hero } from "./_components/hero";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-32">
      <Hero />
      <Benefits />
    </div>
  );
};

export default HomePage;
