import { model, Schema } from "mongoose";
import ICoupon from "./ICoupon";
import CouponStatus from "./CouponStatus";

const couponSchema: Schema = new Schema({
  code: { type: String, required: true },
  percent: { type: Number, required: true },
  limit: { type: Number, default: 0 },
  used: { type: Number, default: 0 },
  expires_at: { type: Date, default: null },
  constraints: { type: Object, required: true },
  status: { type: Number,enum:CouponStatus, default: CouponStatus.ACTIVE },
});

export default model<ICoupon>("Coupon", couponSchema);
