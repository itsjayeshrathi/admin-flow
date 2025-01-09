import { model, Schema } from "mongoose";
interface IProduct {
  product_type: string;
  product_name: string;
  product_price: number;
  product_description: string;
  product_image: string;
}
const productSchema = new Schema<IProduct>(
  {
    product_type: {
      type: String,
      required: true,
    },
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_description: { type: String, required: true },
    product_image: { type: String, required: true },
  },
  { timestamps: true }
);
export const Product = model<IProduct>("Product", productSchema);
