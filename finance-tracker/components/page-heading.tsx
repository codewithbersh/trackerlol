interface PageHeadingProps {
  title: string;
  children?: React.ReactNode;
}

export const PageHeading = ({ title, children }: PageHeadingProps) => {
  return (
    <div className="flex w-full items-center justify-between border-b pb-4 pt-8">
      <div className="grid h-9 place-items-center ">
        <span className="text-2xl font-semibold leading-none">{title}</span>
      </div>
      {children}
    </div>
  );
};
