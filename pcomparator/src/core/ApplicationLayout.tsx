import type { ReactNode } from "react";
import { SignButton } from "~/applications/Authentication/Ui/Signin/SignButton/SignButton";
import { SearchBarcode } from "~/applications/Searchbar/Ui/SearchBarcode/SearchBarcode";
import { Header } from "~/components/Header/Header";
import { Tabbar } from "~/components/Tabbar/Tabbar";
import { Toast } from "~/components/Toast/Toast";
import { getDevice } from "~/core/getDevice";

export interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = async ({ children }: ApplicationLayoutProps) => {
  const device = await getDevice();

  return (
    <>
      <Header rightArea={<SignButton />} />
      {children}
      {device === "mobile" ? <Tabbar mainButton={<SearchBarcode />} /> : null}
      <Toast />
    </>
  );
};

export default ApplicationLayout;
