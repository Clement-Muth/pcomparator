import type { ReactNode } from "react";
import { SignButton } from "~/applications/Authentication/Ui/Signin/SignButton/SignButton";
import { Header } from "~/components/Header/Header";

export interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  return (
    <>
      <Header rightArea={<SignButton />} />
      {children}
    </>
  );
};

export default ApplicationLayout;
