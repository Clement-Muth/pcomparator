import { z } from "zod";
import { Currency } from "~/applications/Prices/Domain/ValueObjects/Currency";

export const ParamsSchema = z.object({
  barcode: z.string(),
  storeName: z.string(),
  productName: z.string(),
  categoryName: z.string(),
  brandName: z.string(),
  location: z.string(),
  amount: z.number().positive(),
  proof: z.string(),
  currency: z.nativeEnum(Currency)
});
