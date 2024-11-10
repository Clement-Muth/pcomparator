"use server";
import { z } from "zod";

const ParamsSchema = z.object({
  barcode: z.string()
});

export const searchByBarcode = async (params: z.infer<typeof ParamsSchema>): Promise<{ name: string }> => {
  try {
    const payload = ParamsSchema.parse(params);

    const {
      product: { product_name }
    } = await (
      await fetch(`https://world.openfoodfacts.net/api/v2/product/${payload.barcode}`, { method: "get" })
    ).json();

    return { name: product_name };
    // return { success: true, prices: res, search: payload.data.search };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
