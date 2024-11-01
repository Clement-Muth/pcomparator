"use server";

import { HTTPError } from "ky";
import { z } from "zod";
import type { Product } from "pcomparator/src/applications/Prices/Domain/Entities/Product";
import { pcomparatorAuthenticatedApiClient } from "pcomparator/src/clients/PcomparatorApiClient";
import { auth } from "pcomparator/src/libraries/nextauth/authConfig";

const ParamsSchema = z.object({
  barcode: z.object({
    barcode: z.string().min(1),
    format: z.string().min(1)
  })
});

const PayloadSchema = z.object({
  image: z.string()
});

export type UpdateAvatarParams = z.infer<typeof ParamsSchema>;
export type UpdateAvatarPayload = z.infer<typeof PayloadSchema>;

export const getProduct = async (params: z.infer<typeof ParamsSchema>): Promise<Product> => {
  const paramsPayload = ParamsSchema.parse(params);
  const session = await auth();

  if (!session?.user?.id) throw new Error("User not authenticated");

  try {
    const product = await pcomparatorAuthenticatedApiClient
      .get(`product/${paramsPayload.barcode.barcode}`)
      .json<Product>();

    return product;
  } catch (err) {
    if (err instanceof HTTPError) {
      switch (err.response.status) {
        case 404: {
          throw new Error("404 NOT FOUND");
        }
      }
    }
    throw err;
  }
};
