interface PageHeadingProps {
  title: string;
  children?: React.ReactNode;
}

export const PageHeading = ({ title, children }: PageHeadingProps) => {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b px-4 lg:fixed lg:top-0 lg:z-50 lg:w-[calc(100%-271px)] lg:border-border/50 lg:bg-background/25 lg:px-8 lg:backdrop-blur-md">
      <h1 className="text-xl font-semibold leading-none">{title}</h1>
      {children}
    </div>
  );
};
