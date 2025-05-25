import { Request, Response } from "express";
import CouponMongoRepository from "../repository/CouponMongoRepository";
import ICouponRepository from "../repository/ICouponRepository";
import CouponValidator from "../../../services/coupon/couponValidator/CouponValidator";


export default class Controller {
    private readonly couponRepository: ICouponRepository
    private readonly couponValidator: CouponValidator
    constructor() {
        this.couponRepository = new CouponMongoRepository()
        this.couponValidator = new CouponValidator()
        this.validation = this.validation.bind(this)
    }

    /**
     * async validation Coupon
     */
    public async validation(req: Request, res: Response) {
        const { couponCode } = req.body
        if (!couponCode) {
            return res.status(403).send({
                success: false,
                message: "کد تخفیف مورد نظر معتبر نمی باشد"
            })
        }
        const coupon = await this.couponRepository.findByCode(couponCode)
        if (!coupon) {
            return res.status(404).send({
                success: false,
                message: "کد تخفیف مورد نظر معتبر نمی باشد"
            })
        }
        this.couponValidator.Handle(coupon)
        return res.send({
            success: true,
            message: "کد تخفیف با موفقیت اعمال شد",
            coupon: {
                percent: coupon.percent,
                code: coupon.code
            }
        })
    }
}