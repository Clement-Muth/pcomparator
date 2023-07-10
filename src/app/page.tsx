import { Balancer } from "react-wrap-balancer";

const HomePage = () => {
  return (
    <>
      <Balancer
        as="h1"
        className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
      >
        PComparator Compare prices of many products
      </Balancer>
      <Balancer as="p" className="mt-6 text-center text-gray-500 md:text-xl">
        PriceComparator is the price comparator for foods, cosmetic and more
      </Balancer>
    </>
  );
};

export default HomePage;
