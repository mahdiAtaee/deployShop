import { FilterQuery } from "mongoose";
import IObjectParams from "../../contracts/IObjectParams";
import IPagination from "../../contracts/IPagination";
import IUserRepository from "../../users/repositories/IUserRepository";
import UserMongoRepository from "../../users/repositories/UserMongoRepository";
import IUser from "../../users/model/IUser";
import ICategory from "../model/ICategory";
import Category from "../model/Category";
import ICategoryRepository from "./ICategoryRepository";

export default class CategoryMongoRepository implements ICategoryRepository {
  private readonly userRepository: IUserRepository

  constructor() {
    this.userRepository = new UserMongoRepository()
  }

  public async findOne(ID: string): Promise<ICategory | null> {
    return Category.findById(ID);
  }

  public async findBySlug(slug: string): Promise<ICategory | null> {
    return Category.findOne({ slug })
  }

  public async findByLevel(level: string): Promise<ICategory[] | null> {
    return Category.find({ level })
  }

  public async findMany(params: IObjectParams, relations?: string[], pagination?: IPagination): Promise<ICategory[]> {
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


    const paymentQuery = Category.find(paymentQueryParams)

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

  public async create(params: any): Promise<ICategory> {
    const newPayment = new Category({ ...params });
    return newPayment.save();
  }

  public async updateOne(
    where: FilterQuery<ICategory>,
    updateData: Partial<ICategory>
  ): Promise<boolean> {
    const Payment = await Category.updateOne(where, updateData);
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
