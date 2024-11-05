"use server";

import { z } from "zod";
import type { Price } from "~/applications/Prices/Domain/Entities/Price";
import type { Product } from "~/applications/Prices/Domain/Entities/Product";
import type { Store } from "~/applications/Prices/Domain/Entities/Store";
import { getCurrencySymbol } from "~/applications/Prices/Domain/ValueObjects/Currency";
import { pcomparatorAuthenticatedApiClient } from "~/clients/PcomparatorApiClient";
import { auth } from "~/libraries/nextauth/authConfig";
import { HTTPError } from "~/types/error";

const ParamsSchema = z.object({
  userId: z.string().uuid()
});

const PayloadSchema = z
  .object({
    priceId: z.string(),
    name: z.string(),
    proof: z.string(),
    location: z.string(),
    price: z.string()
  })
  .array()
  .nullable();

type Payload = z.infer<typeof PayloadSchema>;

export const listUserPrices = async (): Promise<Payload> => {
  try {
    const session = await auth();
    const paramsPayload = ParamsSchema.parse({ userId: session?.user.id });

    const prices = await pcomparatorAuthenticatedApiClient
      .get(`v1/user/${paramsPayload.userId}/prices`)
      .json<(Price & { product: Product; store: Store })[]>();

    return PayloadSchema.parse(
      prices.map<NonNullable<Payload>[number]>((price) => ({
        priceId: price.id,
        name: price.product.name as string,
        proof: price.priceProofImage as string,
        location: price.store.location as string,
        price: `${getCurrencySymbol(price.currency)}${price.amount}`
      }))
    );
  } catch (error) {
    if (error instanceof HTTPError) {
      switch (error.status) {
        case 404:
      }
      console.error("error message:", error);
    }

    throw error;
  }
};
