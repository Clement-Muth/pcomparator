import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthenticationFirewall from "~/applications/Authentication/Ui/AuthenticationFirewall";
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
  themeColor: "#FFF",
  manifest: "/manifest.json"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthenticationFirewall>
          <ApplicationKernel>{children}</ApplicationKernel>
        </AuthenticationFirewall>
      </body>
    </html>
  );
}
