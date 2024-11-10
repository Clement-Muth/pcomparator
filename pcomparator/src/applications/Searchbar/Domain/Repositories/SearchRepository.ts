import type { Price } from "~/applications/Prices/Domain/Entities/Price";

export interface SearchRepository {
  search(query: string): Promise<Price[] | null>;
}
