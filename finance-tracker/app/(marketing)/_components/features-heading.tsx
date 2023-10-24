interface FeaturesHeadingProps {
  title: string;
  description: string;
}

export const FeaturesHeading = ({
  title,
  description,
}: FeaturesHeadingProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-medium">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
