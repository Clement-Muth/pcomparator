import { NavbarItem } from "@nextui-org/react";
import { ProfileButton } from "~/applications/Authentication/Ui/Signin/SignButton/ProfileButton";
import { SigninButton } from "~/applications/Authentication/Ui/Signin/SignButton/SigninButton";
import { auth } from "~/libraries/nextauth/authConfig";

export const SignButton = async () => {
  const session = await auth();

  return session?.user ? (
    <ProfileButton />
  ) : (
    <NavbarItem className="hidden lg:flex">
      <SigninButton />
    </NavbarItem>
  );
};
