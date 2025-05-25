import { FilterQuery } from "mongoose";
import IUser from "../model/IUser";
import IUserRepository from "./IUserRepository";
import UserModel from "../model/User";

export default class UserMongoRepository implements IUserRepository {
  findByEmail(email: string, relations?: string[]): Promise<IUser | null> {
    return UserModel.findOne({ email })
  }
  public async findOne(ID: string): Promise<IUser | null> {
    return UserModel.findById(ID);
  }
  public async findMany(params: any): Promise<IUser[]> {
    return UserModel.find(params);
  }
  public async create(params: any): Promise<IUser> {
    const newUser = new UserModel({ ...params });
    return newUser.save();
  }
  public async updateOne(
    where: FilterQuery<IUser>,
    updateData: Partial<IUser>
  ): Promise<boolean> {
    const User = await UserModel.updateOne(where, updateData);
    if (User) {
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
