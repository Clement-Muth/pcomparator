import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ApplicationKernel from "pcomparator/src/core/ApplicationKernel";
import ApplicationLayout from "pcomparator/src/core/ApplicationLayout";
import { locales } from "pcomparator/src/core/locale";
import { pcomparatorMetadata } from "pcomparator/src/core/metadata";
import { type NextPageProps, withLinguiLayout } from "pcomparator/src/core/withLinguiLayout";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = pcomparatorMetadata;

export const generateStaticParams = () => locales.map((locale) => ({ lang: locale }));

const RootLayout = ({ children, locale }: NextPageProps) => {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ApplicationKernel locale={locale}>
          <ApplicationLayout>{children}</ApplicationLayout>
        </ApplicationKernel>
      </body>
    </html>
  );
};

export const dynamic = "force-dynamic";

export default withLinguiLayout(RootLayout);
