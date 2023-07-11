import getUser from "~/applications/Authentication/Api/getUser";
import UnsignedHome from "~/views/Home/UnsignedHome";

const HomePage = async () => {
  const user = await getUser();

  return user.exist ? <h1>Hello {user.user?.name}</h1> : <UnsignedHome />;
};

export default HomePage;
