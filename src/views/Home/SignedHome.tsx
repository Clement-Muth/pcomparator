import { Plus, PlusCircle, PlusSquare } from "lucide-react";
import { Balancer } from "react-wrap-balancer";
import getUser from "~/applications/Authentication/Api/getUser";
import Button from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";
import ModalView from "~/views/Home/Modal";

const SignedHome = async () => {
  const { user } = await getUser();

  return (
    <div className="flex flex-col items-center max-w-xl">
      <h1
        className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        <Balancer>Hello {user?.name} have a good research</Balancer>
      </h1>
      <ModalView />
    </div>
  );
};

export default SignedHome;
