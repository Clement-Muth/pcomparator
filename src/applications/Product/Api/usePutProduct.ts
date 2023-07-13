import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { pcomparatorApiClient } from "~/clients/PcomparatorApiClient";

type Result = { success: true; productId: string } | { success: false };

const putProduct = async ({
  productId,
  product
}: {
  productId: string;
  product: unknown;
}): Promise<Result> => {
  try {
    await pcomparatorApiClient.put(`${process.env.PCOMPARATOR_API_ENDPOINT}/api/product/${productId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product })
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      const response = err.response;
      switch (response.status) {
        case 401:
          return {
            success: false
          };
      }
    }

    return {
      success: false
    };
  }

  return {
    success: true,
    productId
  };
};

const usePutProduct = (): typeof putProduct => {
  const { mutateAsync: runPutProduct } = useMutation(putProduct);

  return runPutProduct;
};

export default usePutProduct;
