import { Schema, model } from "mongoose";
import IUser from "./IUser";
import AddressSchema from "./Address";

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  mobile: { type: String, unique: true },
  addresses: { type: [AddressSchema], default: [] },
  totalOrders: { type: Number, default: 0 },
  wallet: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

export default model<IUser>("User", userSchema);
