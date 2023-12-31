import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { InvalidPayload } from "~/applications/Product/Domain/InvalidPayload";
import { Product } from "~/applications/Product/Domain/Product";
import { pcomparatorApiClient } from "~/clients/PcomparatorApiClient";

type Result = { success: true; productId: string } | { success: false };

const putProduct = async ({
  productId,
  product
}: {
  productId: string;
  product: Product;
}): Promise<Result> => {
  try {
    await pcomparatorApiClient.put(`${process.env.PCOMPARATOR_API_ENDPOINT}/api/product`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...product,
        product_id: `${product.name}-${product.brand}-${product.market}`
          .replaceAll(/['" ]/g, "-")
          .toLowerCase(),
        price: Number(product.price),
        quantity: Number(product.quantity)
      })
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      const response = err.response;

      switch (response.status) {
        case 400:
          throw new InvalidPayload({ cause: err });
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
