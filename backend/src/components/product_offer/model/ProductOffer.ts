import { Schema, model } from "mongoose";
import IProductOffer from "./IProductOffer";
import ProductOfferItemSchema from "./ProductOfferItem";

const ProductOfferSchema: Schema = new Schema({
  products: { type: [ProductOfferItemSchema], required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});

export default model<IProductOffer>("ProductOffer", ProductOfferSchema);
