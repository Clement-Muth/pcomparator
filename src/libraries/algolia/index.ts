import algoliasearch from "algoliasearch";

export const client = algoliasearch("HVIEKU72LI", "331d3c1b345e8bb4f336a486d31fa24a");

export const productsIndex = client.initIndex("dev_PriceComparator");
export const categoriesIndex = client.initIndex("prod_Categories");
