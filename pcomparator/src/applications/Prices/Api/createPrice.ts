"use server";

import { z } from "zod";
import type { Product } from "~/applications/Prices/Domain/Entities/Product";
import { Currency } from "~/applications/Prices/Domain/ValueObjects/Currency";
import { OpenFoodFactPricesApiClient } from "~/clients/OpenFoodFactPricesApiClient";
import { pcomparatorAuthenticatedApiClient } from "~/clients/PcomparatorApiClient";

const ParamsSchema = z.object({
  barcode: z.string(),
  // storeName: z.string(),
  // productName: z.string(),
  // categoryName: z.string(),
  // brandName: z.string(),
  location: z.string(),
  amount: z.number().positive(),
  proof: z.instanceof(Blob).optional(),
  currency: z.nativeEnum(Currency)
});

const PayloadSchema = z.object({});

export type CreatePriceParams = z.infer<typeof ParamsSchema>;
export type CreatePricePayload = z.infer<typeof PayloadSchema>;

export const createPrice = async (params: z.infer<typeof ParamsSchema>): Promise<Product> => {
  try {
    const paramsPayload = ParamsSchema.parse(params);

    const offProduct = await OpenFoodFactPricesApiClient.get(`products/code/${paramsPayload.barcode}`).json<{
      product_name: string;
      brands: string;
      image_url: string;
    }>();

    const product = await pcomparatorAuthenticatedApiClient
      .post("prices", {
        json: {
          barcode: paramsPayload.barcode,
          storeName: "N/A",
          productName: offProduct.product_name,
          categoryName: "N/A",
          brandName: undefined,
          location: paramsPayload.location,
          amount: paramsPayload.amount,
          proof: offProduct.image_url,
          currency: paramsPayload.currency
        }
      })
      .json<Product>();

    return product;
  } catch (error) {
    throw new Error("Price not found", { cause: "FormError" });
    // if (error instanceof HTTPError) {
    //   switch (error.status) {
    //     case 404:
    //   }
    //   console.error("error message:", error);
    // }

    // throw error;
  }
};
