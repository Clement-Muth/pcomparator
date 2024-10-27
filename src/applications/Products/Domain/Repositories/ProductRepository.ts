import type { Product } from "~/applications/Products/Domain/Entities/Product";
import type { Barcode } from "~/applications/Products/Domain/valueObjects/Barcode";

export interface ProductRepository {
  findByBarcode(id: Barcode): Promise<Product | null>;
}
