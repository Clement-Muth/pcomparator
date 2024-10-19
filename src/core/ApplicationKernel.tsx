import type { ReactNode } from "react";
import ApplicationProvider from "~/core/ApplicationProvider";
import type { AVAILABLE_LOCALES } from "~/core/locale";
import { allMessages } from "~/translations/i18n";

interface ApplicationKernelProps {
  children: ReactNode;
  locale: AVAILABLE_LOCALES;
}

const ApplicationKernel = ({ children, locale }: ApplicationKernelProps) => {
  return (
    <ApplicationProvider locale={locale} messages={allMessages[locale]}>
      {children}
    </ApplicationProvider>
  );
};

export default ApplicationKernel;
