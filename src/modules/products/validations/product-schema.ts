import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  price: z.coerce.number(),
  comparePrice: z.coerce.number().optional(),
  stock: z.coerce.number(),
  category: z.string(),
});
