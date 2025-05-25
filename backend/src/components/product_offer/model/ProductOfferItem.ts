import { Schema } from "mongoose";

const ProductOfferItemSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

export default ProductOfferItemSchema;
