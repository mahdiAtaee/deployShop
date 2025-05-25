import PaymentStatus from "../model/PaymentStatus";
import IPaymentRepository from "./IPaymentRepository";
import PaymentModel from "../model/Payment";
import IPayment from "../model/IPayment";
import { FilterQuery } from "mongoose";
import IObjectParams from "../../contracts/IObjectParams";
import IPagination from "../../contracts/IPagination";
import IUserRepository from "../../users/repositories/IUserRepository";
import UserMongoRepository from "../../users/repositories/UserMongoRepository";
import IUser from "../../users/model/IUser";

export default class PaymentMongoRepository implements IPaymentRepository {
  private readonly userRepository: IUserRepository
  constructor() {
    this.userRepository = new UserMongoRepository()
  }
  public async findOne(ID: string): Promise<IPayment | null> {
    return PaymentModel.findById(ID);
  }
  public async findMany(params: IObjectParams, relations?: string[], pagination?: IPagination): Promise<IPayment[]> {
    const paymentQueryParams: IObjectParams = {}

    if (params.user) {
      const users = await this.userRepository.findMany({
        $or: [
          { firstName: { $regex: params.user } },
          { lastName: { $regex: params.user } },
          { email: { $regex: params.user } },
        ]
      })
      paymentQueryParams.user = { $in: users.map((user: IUser) => user._id) }
    }

    const paymentQuery = PaymentModel.find(paymentQueryParams)

    if (relations && relations.length > 0) {
      relations.forEach((relation: string) => {
        paymentQuery.populate(relation)
      })
    }
    if (pagination) {
      paymentQuery.limit(pagination.perPage).skip(pagination.offset)
    }
    return paymentQuery.exec()
  }
  public async create(params: any): Promise<IPayment> {
    const newPayment = new PaymentModel({ ...params });
    return newPayment.save();
  }
  public async updateOne(
    where: FilterQuery<IPayment>,
    updateData: Partial<IPayment>
  ): Promise<boolean> {
    const Payment = await PaymentModel.updateOne(where, updateData);
    if (Payment) {
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
