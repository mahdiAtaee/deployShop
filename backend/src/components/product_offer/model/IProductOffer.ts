import { Document } from "mongoose";

export default interface IProductOffer extends Document {
  products: [object];
  start_date: Date;
  end_date: Date;
  created_at: Date;
}
