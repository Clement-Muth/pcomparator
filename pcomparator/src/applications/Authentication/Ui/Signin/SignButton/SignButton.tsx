import { ProfileButton } from "pcomparator/src/applications/Authentication/Ui/Signin/SignButton/ProfileButton";
import { SigninButton } from "pcomparator/src/applications/Authentication/Ui/Signin/SignButton/SigninButton";
import { auth } from "pcomparator/src/libraries/nextauth/authConfig";

export const SignButton = async () => {
  const session = await auth();

  return session?.user ? <ProfileButton /> : <SigninButton />;
};
