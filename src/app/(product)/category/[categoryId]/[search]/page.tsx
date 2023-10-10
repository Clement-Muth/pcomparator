"use client";

import clsx from "clsx";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Balancer } from "react-wrap-balancer";
import ProductCard from "~/applications/Product/Ui/ProductCard";
import use from "~/hooks/use";
import { searchProductsWithCategory } from "~/libraries/algolia/searchOnAlgolia";

export interface SearchCategoryPageProps {
  params: Params;
}

const SearchCategoryPage = ({ params }: SearchCategoryPageProps) => {
  const [categories, loading] = use(searchProductsWithCategory, params.search);

  return (
    <div className="grid self-center md:px-12">
      <h1
        className="animate-fade-up bg-gradient-to-br from-black dark:text-white to-stone-500 bg-clip-text text-center font-display text-xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-6xl md:leading-[5rem] md:max-w-3xl justify-self-center"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        <Balancer>
          There are available product for <i>"{params.search}"</i>
        </Balancer>
      </h1>
      <div
        className={clsx(
          "grid grid-cols-1 gap-4 mt-12 w-full justify-self-center",
          "md:grid-cols-3",
          "lg:grid-cols-4"
        )}
      >
        {loading
          ? [...Array(2)].map((_, i) => (
              <Skeleton
                key={`skeleton-${i}`}
                className={clsx(
                  "!w-full !h-[300px] !overflow-hidden !rounded-md !shadow-xl",
                  "md:!max-w-md md:!rounded-2xl"
                )}
              />
            ))
          : categories?.data
              .filter((product) => product.category !== params.categoryId)
              ?.map((product) => {
                console.log(product);
                return <ProductCard {...product} categoryId={params.categoryId} key={product.productId} />;
              })}
      </div>
    </div>
  );
};

export default SearchCategoryPage;
