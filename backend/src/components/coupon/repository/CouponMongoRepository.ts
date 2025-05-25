import IPagination from "src/components/contracts/IPagination";
import ICoupon from "../model/ICoupon";
import IUserRepository from "../../../components/users/repositories/UserMongoRepository";
import Coupon from "../model/Coupon";
import ICouponRepository from "./ICouponRepository";
import IUser from "../../../components/users/model/IUser";
import UserMongoRepository from "../../../components/users/repositories/UserMongoRepository";
import IObjectParams from "../../../components/contracts/IObjectParams";
import { FilterQuery } from "mongoose";


export default class CouponMongoRepository implements ICouponRepository {
    private readonly userRepository: IUserRepository
    constructor() {
        this.userRepository = new UserMongoRepository()
    }


    public async findOne(ID: string, relations?: string[]): Promise<ICoupon | null> {
        return await Coupon.findById(ID)
    }


    public async findMany(params: any, relations?: string[], pagination?: IPagination): Promise<ICoupon[]> {
        const couponQueryParams: IObjectParams = {}

        if (params.user) {
            const users = await this.userRepository.findMany({
                $or: [
                    { firstName: { $regex: params.user } },
                    { lastName: { $regex: params.user } },
                    { email: { $regex: params.user } },
                ]
            })
            couponQueryParams.user = { $in: users.map((user: IUser) => user._id) }
        }
        const couponQuery = Coupon.find(couponQueryParams)


        if (relations && relations.length > 0) {
            relations.forEach((relation: string) => {
                couponQuery.populate(relation)
            })
        }
        if (pagination) {
            couponQuery.limit(pagination.perPage).skip(pagination.offset)
        }
        return couponQuery.exec()
    }


    create(params: any): Promise<ICoupon> {
        const newCoupon = new Coupon({ ...params })
        return newCoupon.save();
    }


    public async updateOne(
        where: FilterQuery<ICoupon>,
        updateData: Partial<ICoupon>
    ): Promise<boolean> {
        const Payment = await Coupon.updateOne(where, updateData);
        if (Payment) {
            return true;
        }
        return false;
    }


    updateMany(where: Partial<ICoupon>, params: Partial<ICoupon>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


    deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


    deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    findByCode(code: string): Promise<ICoupon | null> {
        return Coupon.findOne({ code })
    }

}