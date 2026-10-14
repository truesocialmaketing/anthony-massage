import type { PropsWithChildren } from "react";

import { Metadata } from "next";
import { Cormorant_Garamond, Karla, Roboto } from "next/font/google";

import { cn } from "@/utils";

import { META_DATA } from "@/constants/meta";

import AmbientWave from "@/components/layout/AmbientWave";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Variable axis (no fixed weights) so the v39 copy's 350 weight renders as
// 350 rather than silently snapping to 300.
const karla = Karla({
  subsets: ["latin"],
  variable: "--font-experience",
  display: "swap",
});

export const metadata: Metadata = {
  ...META_DATA,
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex flex-col min-h-screen antialiased",
          roboto.variable,
          cormorantGaramond.variable,
          karla.variable
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ScrollToTop />
        <AmbientWave />
        <Nav />
        <main
          id="main-content"
          className="grow flex flex-col min-h-150"
        >
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
