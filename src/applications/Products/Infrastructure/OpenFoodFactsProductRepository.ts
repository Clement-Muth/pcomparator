import type { Product } from "~/applications/Products/Domain/Entities/Product";
import type { ProductRepository } from "~/applications/Products/Domain/Repositories/ProductRepository";
import type { Barcode } from "~/applications/Products/Domain/valueObjects/Barcode";
import type { OpenFoodFactsProductResponse } from "~/applications/Products/Infrastructure/OpenFoodFactsResponse";
import { openFoodFactApiClient } from "~/clients/OpenFoodFactApiClient";

export class OpenFoodFactsProductRepository implements ProductRepository {
  async findByBarcode(barcode: Barcode): Promise<Product | null> {
    const data = await openFoodFactApiClient
      .get(`product/${barcode.barcode}.json`)
      .json<OpenFoodFactsProductResponse>();

    if (!data) return null;

    return {
      id: data.code,
      name: data.product.product_name,
      type: data.product.product_type,
      image: data.product.image_front_small_url
    };
  }
}
