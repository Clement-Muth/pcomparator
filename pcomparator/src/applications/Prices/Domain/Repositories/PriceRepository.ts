import type { Price } from "pcomparator/src/applications/Prices/Domain/Entities/Price";

export interface PriceRepository {
  create(price: Price): Promise<Price>;
}
