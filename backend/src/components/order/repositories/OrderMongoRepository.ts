import OrderStatus from "../model/OrderStatus";
import IOrderRepository from "./IOrderRepository";
import OrderModel from "../model/Order";
import IOrder from "../model/IOrder";
import { FilterQuery, Types } from "mongoose";
import IPagination from "../../contracts/IPagination";
import IUser from "../../users/model/IUser";
import IUserRepository from "../../users/repositories/IUserRepository";
import UserMongoRepository from "../../users/repositories/UserMongoRepository";
import IOrderParams from "../IOrderParams";

export default class OrderMongoRepository implements IOrderRepository {
  private readonly usersRepository: IUserRepository
  constructor() {
    this.usersRepository = new UserMongoRepository()
  }

  public async findByStatus(status: OrderStatus): Promise<IOrder[]> {
    return OrderModel.find({ status });
  }
  public async findOne(ID: string, relations?: string[]): Promise<IOrder | null> {
    const orderQuery = OrderModel.findById(ID)

    if (relations && relations.length > 0) {
      relations.forEach((relation: string) => {
        orderQuery.populate(relation)
      })
    }
    return orderQuery.exec();
  }
  public async findMany(params: IOrderParams, relations?: string[], pagination?: IPagination): Promise<IOrder[]> {
    const orderQueryParams: IOrderParams = {}

    if (params.user_data) {
      const users = await this.usersRepository.findMany({
        $or: [
          { firstName: { $regex: params.user } },
          { lastName: { $regex: params.user } },
          { email: { $regex: params.user } },
        ]
      })
      orderQueryParams.user = { $in: users.map((user: IUser) => user._id) }
    }

    if (params.user) {
      const objectID = Types.ObjectId
      orderQueryParams.user = new objectID(params.user)
    }

    const orderQuery = OrderModel.find(orderQueryParams)

    if (relations && relations.length > 0) {
      relations.forEach((relation: string) => {
        orderQuery.populate(relation)
      })
    }
    if (pagination) {
      orderQuery.limit(pagination.perPage).skip(pagination.offset)
    }
    return orderQuery.exec()
  }
  public async findByUserDetails(userParams: Partial<IUser>, relations?: string[], pagination?: IPagination): Promise<IOrder[]> {
    const users = await this.usersRepository.findMany({
      $or: [
        { firstName: { $regex: userParams.firstName } },
        { lastName: { $regex: userParams.lastName } },
        { email: { $regex: userParams.email } },
      ]
    })
    const orders = await this.findMany({ user: { $in: users.map((user: IUser) => user._id) } }, relations, pagination)
    return orders
  }
  public async create(params: any): Promise<IOrder> {
    const newOrder = new OrderModel({ ...params });
    return newOrder.save();
  }
  public async updateOne(
    where: FilterQuery<IOrder>,
    updateData: Partial<IOrder>
  ): Promise<boolean> {
    const Order = await OrderModel.updateOne(where, updateData);
    if (Order) {
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
