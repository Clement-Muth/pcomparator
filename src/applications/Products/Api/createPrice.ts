"use server";

import { HTTPError } from "ky";
import { z } from "zod";
import type { Product } from "~/applications/Products/Domain/Entities/Product";
import { pcomparatorAuthenticatedApiClient } from "~/clients/PcomparatorApiClient";
import { auth } from "~/libraries/nextauth/authConfig";

const ParamsSchema = z.object({
  barcode: z.string(),
  proof: z.instanceof(Blob)
});

const PayloadSchema = z.object({});

export type CreatePriceParams = z.infer<typeof ParamsSchema>;
export type CreatePricePayload = z.infer<typeof PayloadSchema>;

export const createPrice = async (params: z.infer<typeof ParamsSchema>): Promise<Product> => {
  const paramsPayload = ParamsSchema.parse(params);
  const session = await auth();

  if (!session?.user?.id) throw new Error("User not authenticated");

  try {
    const product = await pcomparatorAuthenticatedApiClient
      .post(`product/${paramsPayload.barcode}`, {
        json: paramsPayload.proof,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .json<Product>();

    return product;
  } catch (err) {
    if (err instanceof HTTPError) {
      switch (err.response.status) {
        case 404: {
          console.log("Not Found");
          throw new Error("404 NOT FOUND");
        }
      }
    }
    throw err;
  }
};
