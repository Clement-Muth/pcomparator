import type { ReactNode } from "react";
import { SignButton } from "pcomparator/src/applications/Authentication/Ui/Signin/SignButton/SignButton";
import { Header } from "pcomparator/src/components/Header/Header";
import { Toast } from "pcomparator/src/components/Toast/Toast";

export interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  return (
    <>
      <Header rightArea={<SignButton />} />
      {children}
      <Toast />
    </>
  );
};

export default ApplicationLayout;
