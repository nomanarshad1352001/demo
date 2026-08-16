import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "INDUS LOOM — Socks & Hosiery Division | Crafted on the Indus",
  description:
    "INDUS LOOM Socks & Hosiery Division — Computerised jacquard knitting, seamless construction, full-scale sizing from infant to XXL. MOQ 3,000 pairs. OEKO-TEX & Sedex certified. Karachi, Pakistan.",
  keywords: [
    "socks manufacturer",
    "hosiery manufacturer Pakistan",
    "custom socks",
    "jacquard socks",
    "B2B socks",
    "crew socks",
    "sport socks",
    "dress socks",
    "kids socks",
    "compression socks",
    "OEKO-TEX socks",
    "wholesale socks Pakistan",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-charcoal-900 antialiased font-body">
        {children}
      </body>
    </html>
  );
}
