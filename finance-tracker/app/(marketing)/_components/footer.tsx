import Link from "next/link";

export const Footer = () => {
  return (
    <div className="mt-auto py-12 text-center text-sm font-medium text-muted-foreground">
      Built by{" "}
      <Link
        href="https://twitter.com/codewithbersh"
        target="_blank"
        className="underline"
      >
        @codewithbersh
      </Link>
    </div>
  );
};
