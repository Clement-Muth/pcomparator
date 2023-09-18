import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { z } from "zod";
import { Category } from "~/applications/Product/Domain/Categories";
import { InvalidPayload } from "~/applications/Product/Domain/InvalidPayload";
import { pcomparatorApiClient } from "~/clients/PcomparatorApiClient";

const CategoriesSchema = z.array(
  z.object({
    id: z.string(),
    image: z.string(),
    name: z.string()
  })
);

export type CategoriesPayload = z.infer<typeof CategoriesSchema>;

type FetchCategoriesQuery = { id: string };

export const fetchCategoriesKey = (query: FetchCategoriesQuery): ["categories", FetchCategoriesQuery] => [
  "categories",
  query
];

const fetchCategories = async (query: FetchCategoriesQuery): Promise<Category[]> => {
  let response: Response | undefined;

  try {
    response = await pcomparatorApiClient.get(
      `${process.env.PCOMPARATOR_API_ENDPOINT}/api/category/categories`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  } catch (err) {
    if (err instanceof HTTPError) {
      const response = err.response;

      switch (response.status) {
        case 400:
          throw new InvalidPayload({ cause: err });
      }
    }

    throw err;
  }

  const categoriesPayload = CategoriesSchema.parse(await response.json());

  return categoriesPayload.map((categoryPayload) => ({
    id: categoryPayload.id,
    image: categoryPayload.image,
    name: categoryPayload.name
  }));
};

const useGetCategories = (
  query: FetchCategoriesQuery | false
): {
  isLoading: boolean;
  categories: Category[];
} => {
  const {
    isLoading,
    isFetching,
    data: categories,
    status,
    error
  } = useQuery(query ? fetchCategoriesKey(query) : [], () => (query ? fetchCategories(query) : null), {
    enabled: query !== false
  });

  if (status === "error") throw error;

  return {
    isLoading: isFetching && isLoading,
    categories: categories as Category[]
  };
};

export default useGetCategories;
