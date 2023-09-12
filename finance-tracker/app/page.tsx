import Link from "next/link";

const HomePage = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-muted-foreground">TODO: Marketing Page</p>
        <Link href="/login" className="underline">
          Sign-in
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
