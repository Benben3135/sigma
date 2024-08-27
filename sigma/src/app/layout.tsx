import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ThemeProvider } from "./provider";
import Navbar from "@/components/Navbar";
import { NextUIProvider } from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/react-query-client";
import Providers from "@/utils/Providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Sigma",
  description: "Your growth is our priority",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en" suppressHydrationWarning>
          <head>
            <link rel="icon" href="/favicon.png" sizes="any" />
          </head>
          <body
            className={cn(
              "min-h-screen bg-[#030014] font-sans antialiased overflow-y-scroll overflow-x-hidden",
              fontSans.variable
            )}
          >
            {" "}
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <NextUIProvider>
                <main>
                  <Navbar />
                  {children}
                </main>
              </NextUIProvider>
            </ThemeProvider>
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
