import { BENEFITS } from "./config";

export const Benefits = () => {
  return (
    <div
      className="animate-fade-up  grid grid-cols-1 gap-4 opacity-0 sm:grid-cols-2 md:grid-cols-3"
      style={{ animationDelay: "1s", animationFillMode: "forwards" }}
    >
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
          <p className="max-w-[320px] text-center text-muted-foreground">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
};
