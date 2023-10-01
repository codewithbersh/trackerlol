interface PageHeadingProps {
  title: string;
  children?: React.ReactNode;
}

export const PageHeading = ({ title, children }: PageHeadingProps) => {
  return (
    <div className="flex w-full items-center justify-between border-b py-4 lg:sticky lg:top-0 lg:z-50 lg:border-border/50 lg:bg-background/75 lg:backdrop-blur-md">
      <div className="grid h-9 place-items-center ">
        <span className="text-2xl font-semibold leading-none">{title}</span>
      </div>
      {children}
    </div>
  );
};
