import { Document } from "mongoose";
import ShipmentStatus from "./ShipmentStatus";

export default interface IShipment extends Document {
    employee: string,
    order: string,
    selectedDateTime: Date,
    deliveryAt: Date,
    note: string,
    status: ShipmentStatus
}