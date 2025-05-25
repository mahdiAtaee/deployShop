import { NextFunction, Request, Response } from "express";
import IPaymentRepository from "../repositories/IPaymentRepository";
import PaymentMongoRepository from "../repositories/PaymentMongoRepository";
import ITransformer from "../../contracts/ITransformer";
import IPayment from "../model/IPayment";
import PaymentTransformer from "./PaymentTransformer";

export default class PaymentController {
    private readonly PaymentRepository: IPaymentRepository
    private readonly PaymentTransformer: ITransformer<IPayment>
    constructor() {
        this.PaymentRepository = new PaymentMongoRepository()
        this.PaymentTransformer = new PaymentTransformer()
        this.index = this.index.bind(this)
    }
    public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        const perPage = 5
        const page = req.query.page || 1
        const offset = Math.ceil((page as unknown as number) - 1 / perPage)
        const totalPayments = await this.PaymentRepository.findMany({})
        const payments = await this.PaymentRepository.findMany({}, ['order', 'user'], { perPage, offset })
        const transformedPayment = await this.PaymentTransformer.collection(payments)

        res.send({
            data: transformedPayment,
            __metadata: {
                totalPages: Math.ceil((totalPayments.length) / perPage),
                totalItems: totalPayments.length,
                page,
                perPage
            }
        })
    }
}