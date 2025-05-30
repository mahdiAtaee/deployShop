import { NextFunction, Request, Response } from "express";
import OrderService from "../order/services/orderService";
import { verify } from '../../services/JWTService'
import ServerException from "../exceptions/ServerException";
import PaymentService from "../../services/payment/PaymentService";
import IOrder from "../order/model/IOrder";

export default class Controller {
    private readonly orderService: OrderService
    private readonly paymentService: PaymentService
    constructor() {
        this.orderService = new OrderService()
        this.paymentService = new PaymentService()
        this.purchaseOrder = this.purchaseOrder.bind(this)
    }
    public async purchaseOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = await verify(req.headers.authorization as string)

            const orderData = {
                userID: id,
                items: [...req.body.basket],
                deliveryAddress: req.body.delivery_address,
                coupon: req.body.coupon
            }

            const newOrder = await this.orderService.addOrder(orderData)

            if (!newOrder) {
                throw new ServerException('در حال حاضر نمی توان سفارش جدید اضافه کرد')
            }
            const paymentResult = await this.paymentService.payOrder(newOrder as IOrder, req.body.payment_method)
            

            res.send({
                success: true
            })
        } catch (error) {
            next(error)
        }
    }
}