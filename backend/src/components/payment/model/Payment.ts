import { Schema, model } from "mongoose";
import PaymentStatus from "./PaymentStatus";
import IPayment from "./IPayment";

const paymentSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  reserve: { type: String, required: true },
  reference: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: {
    type: Number,
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
    required: true,
  },
});

export default model<IPayment>("Payment", paymentSchema);
