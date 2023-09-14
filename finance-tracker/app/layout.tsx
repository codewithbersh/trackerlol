import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";

import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import ModalProvider from "@/components/providers/modal-provider";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/components/providers/query-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "Finance Tracking Web Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased font-sans relative",
          font.className
        )}
      >
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <ModalProvider />
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
