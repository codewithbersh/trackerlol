import { BENEFITS } from "./config";

export const Benefits = () => {
  return (
    <div className="grid  grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {BENEFITS.map(({ icon: Icon, description }, index) => (
        <div
          key={index}
          className="flex min-w-fit flex-col items-center justify-center gap-4"
        >
          <div className="rounded-full border-t bg-gradient-to-t from-background to-primary-foreground/50 p-2">
            <div className="rounded-full border-t bg-gradient-to-t from-background to-primary-foreground/50 p-4">
              <Icon className="h-4 w-4 text-primary/75" />
            </div>
          </div>
          <p className="max-w-prose text-center text-muted-foreground">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
};
