import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Header from "~/components/Header/Header";
import ApplicationKernel from "~/core/ApplicationKernel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PriceComparator - Compare prices of many products",
  description: "PriceComparator is the price comparator for foods, cosmetic and more",
  twitter: {
    card: "summary_large_image",
    title: "PriceComparator - Compare of many products",
    description: "PriceComparator is the price comparator for foods, cosmetic and more",
    creator: "@Clement-Muth"
  },
  metadataBase: new URL("https://price-comparator.vercel.app"),
  themeColor: "#FFF"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApplicationKernel>{children}</ApplicationKernel>
      </body>
    </html>
  );
}
