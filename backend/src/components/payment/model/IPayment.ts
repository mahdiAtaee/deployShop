import { Document } from "mongoose";
import PaymentStatus from "./PaymentStatus";

export default interface IPayment extends Document {
    user: string
    order: string
    amount: number
    reserve: string
    reference: string
    method: string
    created_at: Date
    updated_at: Date
    status: PaymentStatus
}