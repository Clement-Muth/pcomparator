"use client";

import { NextUIProvider } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Provider as ReactWrapBalancerProvider } from "react-wrap-balancer";
import DeviceProvider from "pcomparator/src/core/DeviceProvider";
import TranslationProvider from "pcomparator/src/core/TranslationProvider";
import type { AVAILABLE_LOCALES } from "pcomparator/src/core/locale";
import type { Device } from "pcomparator/src/types/device";

interface ApplicationProviderProps {
  children: ReactNode;
  locale: AVAILABLE_LOCALES;
  messages: any;
  device: Device;
}

const ApplicationProvider = ({ children, locale, messages, device }: ApplicationProviderProps) => {
  const router = useRouter();

  return (
    <SessionProvider>
      <NextUIProvider locale={locale} navigate={router.push}>
        <I18nProvider locale={locale}>
          <NextThemesProvider attribute="class" enableSystem>
            <TranslationProvider locale={locale} messages={messages}>
              <DeviceProvider device={device}>
                <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>
              </DeviceProvider>
            </TranslationProvider>
          </NextThemesProvider>
        </I18nProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default ApplicationProvider;
