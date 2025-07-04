import { Document } from "mongoose";
import CouponStatus from "./CouponStatus";

export default interface ICoupon extends Document {
  code: string;
  percent: number;
  limit: number;
  used: number;
  expires_at: Date;
  constraints: {
    users: string[],
    products: string[]
  };
  status: CouponStatus;
}
