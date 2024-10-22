import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ApplicationKernel from "~/core/ApplicationKernel";
import ApplicationLayout from "~/core/ApplicationLayout";
import { type AVAILABLE_LOCALES, locales } from "~/core/locale";
import { pcomparatorMetadata } from "~/core/metadata";
import { withLinguiLayout } from "~/core/withLinguiLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = pcomparatorMetadata;

export const generateStaticParams = () => locales.map((locale) => ({ lang: locale }));

const RootLayout = ({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: AVAILABLE_LOCALES };
}) => {
  return (
    <html lang={locale}>
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
