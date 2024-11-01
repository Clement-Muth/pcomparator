import type { ReactNode } from "react";
import ApplicationProvider from "pcomparator/src/core/ApplicationProvider";
import { getDevice } from "pcomparator/src/core/getDevice";
import type { AVAILABLE_LOCALES } from "pcomparator/src/core/locale";
import { allMessages } from "pcomparator/src/translations/i18n";

interface ApplicationKernelProps {
  children: ReactNode;
  locale: AVAILABLE_LOCALES;
}

const ApplicationKernel = async ({ children, locale }: ApplicationKernelProps) => {
  const device = await getDevice();

  return (
    <ApplicationProvider locale={locale} messages={allMessages[locale]} device={device}>
      {children}
    </ApplicationProvider>
  );
};

export default ApplicationKernel;
