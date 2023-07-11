import { getServerSession } from "next-auth";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import { User } from "~/applications/Authentication/Domain/User";

const getUser = async () => {
  const session = await getServerSession(authOptions);
  const user = new User(session?.user);

  return user;
};

export default getUser;
