import { z } from "zod";
const product_schema = z.object({
  product_type: z.string(),
  product_name: z.string(),
  product_price: z.number(),
  product_description: z.string(),
  product_image: z.string().optional(),
});
export { product_schema };
