import clsx from "clsx";
import { Balancer } from "react-wrap-balancer";

const UnsignedHome = () => {
  return (
    <div className="flex flex-col items-center max-w-2xl">
      <h1
        className={clsx(
          "animate-fade-up bg-gradient-to-br dark:text-white from-black to-stone-500 bg-clip-text text-center font-display text-5xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm",
          "md:text-7xl md:leading-[5rem]"
        )}
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        <Balancer>PComparator Compare prices of many products</Balancer>
      </h1>
      <p
        className="mt-6 animate-fade-up text-center text-gray-500 dark:text-gray-300 opacity-0 md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <Balancer>PComparator is the price comparator for foods, cosmetic and more</Balancer>
      </p>
    </div>
  );
};

export default UnsignedHome;
