import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional().default(""),
  price: z.coerce.number().positive(),
  comparePrice: z.coerce.number().optional().default(0),
  stock: z.coerce.number().int().min(0),
  category: z.string().optional().default(""),
  images: z.string().optional().default(""), // comma-separated URLs
  status: z.enum(["draft", "active"]).default("active"),
  variants: z.string().optional().default(""), // comma-separated variant options
});
