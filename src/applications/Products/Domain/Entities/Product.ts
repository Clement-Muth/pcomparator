import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  image: z.string().url()
});

export type Product = z.infer<typeof ProductSchema>;
