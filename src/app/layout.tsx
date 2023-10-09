import "@radix-ui/themes/styles.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthenticationProvider from "~/applications/Authentication/Ui/AuthenticationProvider";
import ApplicationKernel from "~/core/ApplicationKernel";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PComparator - Compare prices of many products",
  description: "PComparator is the price comparator for foods, cosmetic and more",
  twitter: {
    card: "summary_large_image",
    title: "PComparator - Compare of many products",
    description: "PComparator is the price comparator for foods, cosmetic and more",
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
        <AuthenticationProvider>
          <ApplicationKernel>{children}</ApplicationKernel>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
