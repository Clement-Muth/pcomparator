"use server";

import { ProductSchema } from "~/applications/Products/Domain/Entities/Product";
import { pcomparatorAuthenticatedApiClient } from "~/clients/PcomparatorApiClient";

export const createProduct = async (_: any, data: FormData): Promise<void> => {
  try {
    const formData = Object.fromEntries(data);
    const paramsPayload = ProductSchema.parse(formData);

    await pcomparatorAuthenticatedApiClient.post("/v1/products/{barcode}", {
      params: {
        path: {
          barcode: paramsPayload.barcode
        }
      },
      body: {
        productName: paramsPayload.name,
        categoryName: paramsPayload.categoryName,
        brandName: paramsPayload.brandName
      }
    });
  } catch (error) {
    console.error(error);
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
