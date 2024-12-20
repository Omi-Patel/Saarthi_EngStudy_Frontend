import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./provider";
import { Navbar } from "./_components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/AuthContext";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EngStudy - Engineering Study Platform",
  description:
    "Access all necessary study materials in a structured and organized manner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col mx-3 sm:mx-6">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by EngStudy. The source code is available on{" "}
                    <a
                      href="https://github.com/Omi-Patel"
                      className="underline"
                      target="_blank"
                    >
                      GitHub
                    </a>
                    .
                  </p>
                </div>
              </footer>
            </div>
            <Toaster />
          </AuthProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
