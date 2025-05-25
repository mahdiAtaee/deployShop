import { Request, Response, NextFunction } from "express";
import ICouponRepository from "../repository/ICouponRepository";
import CouponMongoRepository from "../repository/CouponMongoRepository";
import ITransformer from "../../contracts/ITransformer";
import ICoupon from "../model/ICoupon";
import CouponTransformer from "./CouponTransformer";

export default class CouponController {
    private readonly CouponRepository: ICouponRepository
    private readonly CouponTransformer: ITransformer<ICoupon>
    constructor() {
        this.CouponRepository = new CouponMongoRepository()
        this.CouponTransformer = new CouponTransformer()
        this.index = this.index.bind(this)
        this.store = this.store.bind(this)
    }
    public async index(req: Request, res: Response, next: NextFunction) {
        const perPage = 5
        const page = req.query.page || 1
        const offset = Math.ceil(((page as number) - 1) / perPage)
        
        const coupons = await this.CouponRepository.findMany({}, [], { perPage, offset })
        
        const totalCoupons = await this.CouponRepository.findMany({})
        
        const finalCoupons = await this.CouponTransformer.collection(coupons)

        res.send({
            data: finalCoupons,
            __metadata: {
                totalPages: Math.ceil((totalCoupons.length) / perPage),
                totalItems: totalCoupons.length,
                page,
                perPage,
            }
        })
    }

    public async store(req: Request, res: Response, next: NextFunction) {
        await this.CouponRepository.create({
            code: req.body.code,
            percent: req.body.percent,
            limit: req.body.limit,
            expires_at: req.body.expires_at,
            constraints: req.body.constraints
        }).then(response => {
            console.log(response);
            res.send({
                success: true,
                message: "کد تخفیف جدید با موفقیت انجام شد"
            })
        }).catch(error => {
            res.send({
                success: false,
                message: error
            })
        })
    }
}
