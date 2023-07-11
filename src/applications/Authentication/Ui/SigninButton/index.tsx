import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import SigninButtonBase from "~/applications/Authentication/Ui/SigninButton/SigninButtonBase";

const SigninButton = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ? (
    <Image
      src={session.user.image ?? ""}
      alt=""
      width={30}
      height={30}
      className="rounded-full"
      style={{ width: "auto", height: "auto" }}
    />
  ) : (
    <SigninButtonBase />
  );
};

export default SigninButton;
