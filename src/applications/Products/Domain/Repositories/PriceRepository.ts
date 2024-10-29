import type { Price } from "~/applications/Products/Domain/Entities/Price";

export interface PriceRepository {
  create(price: Price): Promise<Price>;
}
