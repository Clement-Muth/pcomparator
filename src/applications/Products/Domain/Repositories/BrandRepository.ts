import type { Brand } from "~/applications/Products/Domain/Entities/Brand";

export interface BrandRepository {
  create(brand: Brand): Promise<Brand>;

  findUnique(name: string): Promise<Brand | null>;
}
