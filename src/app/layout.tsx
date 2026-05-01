import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"]
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The Sovereign Archive | Perpetual Growth",
  description: "A permanent digital repository and institutional framework dedicated to the principles of generational wealth, intellectual preservation, and sovereign governance.",
};

import { ToastProvider } from "@/components/Toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${newsreader.variable} ${manrope.variable} bg-background text-on-background font-body`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
