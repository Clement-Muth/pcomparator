import type { ReactNode } from "react";
import { SignButton } from "~/applications/Authentication/Ui/Signin/SignButton/SignButton";
import { Header } from "~/components/Header/Header";
import { Toast } from "~/components/Toast/Toast";

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
