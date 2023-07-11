import { getServerSession } from "next-auth";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import UserDropdown from "~/applications/Authentication/Ui/Dropdown";
import SigninButtonBase from "~/applications/Authentication/Ui/SigninButton/SigninButtonBase";

const SigninButton = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ? <UserDropdown session={session} /> : <SigninButtonBase />;
};

export default SigninButton;
