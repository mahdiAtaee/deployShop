import { NextFunction, Response, Request } from "express";
import IPaymentRepository from "../repositories/IPaymentRepository";
import PaymentMongoRepository from "../repositories/PaymentMongoRepository";
import Gateways from "../../../config/Gateways";


export default class Controller {
    private readonly paymentRepository: IPaymentRepository
    constructor() {
        this.paymentRepository = new PaymentMongoRepository()
        this.gatewaysList = this.gatewaysList.bind(this)
    }

    public async gatewaysList(req: Request, res: Response, next: NextFunction) {
        try {
            res.send({
                success:true,
                Gateways
            })
        } catch (error) {
            res.send({
                success:false,
                message: "لیست درگاه های پرداخت در حال حاضر قابل دریافت نمی باشد"
            })
        }
    }
}