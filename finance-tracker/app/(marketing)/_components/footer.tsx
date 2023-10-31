import Link from "next/link";

export const Footer = () => {
  return (
    <div className="mt-auto py-12 text-center text-sm font-medium">
      <span className="text-muted-foreground/50">Built by </span>
      <Link
        href="https://twitter.com/codewithbersh"
        target="_blank"
        className="text-muted-foreground underline underline-offset-4 transition-colors duration-300 ease-in-out hover:text-primary"
      >
        codewithbersh
      </Link>
    </div>
  );
};
