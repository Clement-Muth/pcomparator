import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ApplicationKernel from "~/core/ApplicationKernel";
import ApplicationLayout from "~/core/ApplicationLayout";
import { locales } from "~/core/locale";
import { pcomparatorMetadata } from "~/core/metadata";
import { type NextPageProps, withLinguiLayout } from "~/core/withLinguiLayout";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = pcomparatorMetadata;

export const generateStaticParams = () => locales.map((locale) => ({ lang: locale }));

const RootLayout = ({ children, locale }: NextPageProps) => {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <div className="fixed h-screen w-full bg-gradient-to-br dark:from-[#1f121b] dark:via-[#0c1820] dark:via-80% dark:to-[#081917] from-indigo-50 via-white to-primary-200">
          <ApplicationKernel locale={locale}>
            <ApplicationLayout>{children}</ApplicationLayout>
          </ApplicationKernel>
        </div>
      </body>
    </html>
  );
};

export const dynamic = "force-dynamic";

export default withLinguiLayout(RootLayout);
