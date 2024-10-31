import type { CreatePrice, Price } from "~/applications/Prices/Domain/Entities/Price";
import type { Currency } from "~/applications/Prices/Domain/ValueObjects/Currency";
import { prisma } from "~/libraries/prisma";

export class PrismaPriceRepository {
  async create(price: CreatePrice): Promise<Price> {
    const createdPrice = await prisma.price.create({
      data: {
        amount: price.amount,
        currency: price.currency,
        date_recorded: price.dateRecorded ?? undefined,
        price_proof_image: price.priceProofImage,
        product_id: price.productId,
        store_id: price.storeId
      }
    });

    return {
      amount: createdPrice.amount,
      currency: createdPrice.currency as Currency,
      dateRecorded: createdPrice.date_recorded,
      id: createdPrice.id,
      priceProofImage: createdPrice.price_proof_image,
      productId: createdPrice.product_id,
      storeId: createdPrice.store_id
    };
  }
}
