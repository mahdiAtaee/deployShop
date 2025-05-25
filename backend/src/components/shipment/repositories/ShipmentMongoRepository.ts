import { FilterQuery } from "mongoose";
import IShipment from "../model/IShipment";
import IShipmentRepository from "./IShipmentRepository";
import ShipmentModel from "../model/Shipment";

export default class ShipmentMongoRepository implements IShipmentRepository {
  public async findOne(ID: string): Promise<IShipment | null> {
    return ShipmentModel.findById(ID);
  }
  public async findMany(params: any): Promise<IShipment[]> {
    return ShipmentModel.find(params);
  }
  public async create(params: any): Promise<IShipment> {
    const newShipment = new ShipmentModel({ ...params });
    return newShipment.save();
  }
  public async updateOne(
    where: FilterQuery<IShipment>,
    updateData: Partial<IShipment>
  ): Promise<boolean> {
    const Shipment = await ShipmentModel.updateOne(where, updateData);
    if (Shipment) {
      return true;
    }
    return false;
  }
  public async updateMany(where: any, params: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async deleteOne(ID: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async deleteMany(where: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
