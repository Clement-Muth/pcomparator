import type { Product } from "pcomparator/src/applications/Prices/Domain/Entities/Product";

export interface ProductRepository {
  create(product: Product): Promise<Product>;

  findUnique(barcode: string): Promise<Product | null>;

  findOrCreate(barcode: string, productData: Product): Promise<Product>;
}
