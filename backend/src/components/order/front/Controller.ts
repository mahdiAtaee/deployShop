import { NextFunction, Request, Response } from "express";
import OrderService from "../services/orderService";
import IOrderRepository from "../repositories/IOrderRepository";
import OrderMongoRepository from "../repositories/OrderMongoRepository";
import { verify } from '../../../services/JWTService'
import ServerException from "../../exceptions/ServerException";
import ITransformer from "../../contracts/ITransformer";
import IOrder from "../model/IOrder";
import Transformer from "./Transformer";

export default class Controller {
    private readonly orderService: OrderService
    private readonly orderRepository: IOrderRepository
    private readonly transformer: ITransformer<IOrder>
    constructor() {
        this.orderRepository = new OrderMongoRepository()
        this.orderService = new OrderService()
        this.transformer = new Transformer()
        this.store = this.store.bind(this)
        this.list = this.list.bind(this)
    }
    public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
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
            res.send({
                success: true
            })
        } catch (error) {
            next(error)
        }
    }

    public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = await verify(req.headers.authorization as string)
            
            
            const orders = await this.orderRepository.findMany({ user: id }, undefined, { perPage: 10, offset: 0 })
            res.send(this.transformer.collection(orders))
        } catch (error) {
            next(error)
        }
    }
}