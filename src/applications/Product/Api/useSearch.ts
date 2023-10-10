import { useCallback, useState } from "react";
import { Category } from "~/applications/Product/Domain/Categories";
import { Product } from "~/applications/Product/Domain/Product";
import { searchProductsWithCategory } from "~/libraries/algolia/searchOnAlgolia";

const useSearch = () => {
  const [search, setSearch] = useState<{ categories: Category[]; data: Product[]; search: string } | null>(
    null
  );
  const onSearch = useCallback(
    async (searchString: string) => {
      if (!searchString) {
        search && setSearch(null);
        return search;
      }
      const categories = await searchProductsWithCategory(searchString);

      // TODO - Fix error
      // @ts-ignore
      setSearch({ ...categories, search: searchString });
      return search;
    },
    [search]
  );

  return { onSearch, searchResult: search };
};

export default useSearch;
