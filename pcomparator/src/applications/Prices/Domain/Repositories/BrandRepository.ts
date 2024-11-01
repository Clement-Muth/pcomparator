import type { Brand } from "pcomparator/src/applications/Prices/Domain/Entities/Brand";

export interface BrandRepository {
  create(brand: Brand): Promise<Brand>;

  findUnique(name: string): Promise<Brand | null>;
}
