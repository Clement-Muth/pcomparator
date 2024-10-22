"use client";

import { NextUIProvider } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import { Provider as ReactWrapBalancerProvider } from "react-wrap-balancer";
import TranslationProvider from "~/core/TranslationProvider";
import type { AVAILABLE_LOCALES } from "~/core/locale";

interface ApplicationProviderProps {
  children: ReactNode;
  locale: AVAILABLE_LOCALES;
  messages: any;
}

const ApplicationProvider = ({ children, locale, messages }: ApplicationProviderProps) => {
  return (
    <SessionProvider >
      <NextUIProvider locale={locale}>
        <I18nProvider locale={locale}>
          <NextThemesProvider attribute="class" enableSystem >
            <TranslationProvider locale={locale} messages={messages}>
              <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>
            </TranslationProvider>
          </NextThemesProvider>
        </I18nProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default ApplicationProvider;
