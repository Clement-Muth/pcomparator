import getUser from "~/applications/Authentication/Api/getUser";
import SignedHome from "~/views/Home/SignedHome";
import UnsignedHome from "~/views/Home/UnsignedHome";

const HomePage = async () => {
  const user = await getUser();

  return user.exist ? <SignedHome /> : <UnsignedHome />;
};

export default HomePage;
