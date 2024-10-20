import type { ReactNode } from "react";
import { Header } from "~/components/Header/Header";

export interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ApplicationLayout;
