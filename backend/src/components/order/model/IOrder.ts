import { Document } from "mongoose";
import IAddress from "src/components/users/model/IAddress";
import IOrderLine from "./IOrderLine";
import OrderStatus from "./OrderStatus";

export default interface IOrder extends Document {
  user: string;
  totalPrice: number;
  finalPrice: number;
  coupon: object;
  deliveryAddress: IAddress;
  orderLines: IOrderLine[];
  created_at: Date;
  updated_at: Date;
  status: OrderStatus;
}
