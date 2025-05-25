import { FilterQuery } from "mongoose";
import ISetting from "../model/ISetting";
import ISettingRepository from "./ISettingRepository";
import SettingModel from "../model/Setting";

export default class SettingMongoRepository implements ISettingRepository {
  public async findOne(ID: string): Promise<ISetting | null> {
    return SettingModel.findById(ID);
  }
  public async findMany(params: any): Promise<ISetting[]> {
    return SettingModel.find(params);
  }
  public async create(params: any): Promise<ISetting> {
    const newSetting = new SettingModel({ ...params });
    return newSetting.save();
  }
  public async updateOne(
    where: FilterQuery<ISetting>,
    updateData: Partial<ISetting>
  ): Promise<boolean> {
    const Setting = await SettingModel.updateOne(where, updateData);
    if (Setting) {
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
