const SignedHome = dynamic(() => import("~/views/Home/SignedHome"));
// const UnsignedHome = dynamic(() => import("~/views/Home/UnsignedHome"));
import dynamic from "next/dynamic";
import getUser from "~/applications/Authentication/Api/getUser";

const HomePage = async () => {
	const user = await getUser();

	return <SignedHome />;
	// return !user.exist ? <UnsignedHome /> : <SignedHome />;
};

export default HomePage;
