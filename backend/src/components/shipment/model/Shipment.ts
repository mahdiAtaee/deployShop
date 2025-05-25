import { model, Schema } from "mongoose";
import ShipmentStatus from "./ShipmentStatus";
import IShipment from "./IShipment";

const shipmentSchema: Schema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: "User" },
  order: { type: Schema.Types.ObjectId, ref: "Order" },
  selectedDateTime: { type: Date, required: true },
  deliveryAt: { type: Date, default: null },
  note: { type: String, default: null },
  status: { type: String, enum: ShipmentStatus, default: ShipmentStatus.PENDING },
});

export default model<IShipment>("Shipment", shipmentSchema);
