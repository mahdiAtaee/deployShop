import { Request, Response } from "express";
import OrderMongoRepository from "../repositories/OrderMongoRepository";
import OrderTransformer from './OrderTransformer'
import IOrder from "../model/IOrder";
import NotFoundException from "../../exceptions/NotFoundException";
import OrderService from "../services/orderService";

class OrderController {
  private readonly OrderRepository: OrderMongoRepository;
  private readonly Transformer: OrderTransformer;
  private readonly OrderService
  constructor() {
    this.OrderRepository = new OrderMongoRepository();
    this.Transformer = new OrderTransformer()
    this.OrderService = new OrderService()
    this.index = this.index.bind(this)
    this.find = this.find.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
  }

  public async index(req: Request, res: Response): Promise<void> {
    const perPage = 3
    const page = req.query.page || 1
    const offset = Math.ceil((page as unknown as number) - 1 / perPage)
    const orders = await this.OrderRepository.findMany({
      user_data: req.query.keyword as string,
    }, ["user"], {
      perPage,
      offset
    });
    const totalOrders = await this.OrderRepository.findMany({
      user_data: req.query.keyword as string,
    })
    const finalOrders = await this.Transformer.collection(orders)
    res.send({
      data: finalOrders,
      _metadata: {
        perPage,
        page,
        totalPages: Math.ceil(totalOrders.length / perPage),
        totalItems: totalOrders.length
      }
    });
  }

  public async find(req: Request, res: Response): Promise<void> {
    const OrderID = req.params.orderID
    const order = await this.OrderRepository.findOne(OrderID, ['user', 'coupon', 'orderLines.product'])
    if (!order) {
      throw new NotFoundException('سفارش مورد نظر یافت نشد!')
    }
    const finalOrder = await this.Transformer.transform(order as IOrder)
    res.send(finalOrder)
  }

  public async updateStatus(req: Request, res: Response): Promise<void> {
    this.OrderService.updateStatus(req.params.orderID, req.body.orderStatus)
      .then(result => {
        if (result) {
          res.send({
            success: true,
            message: 'عملیات بروزرسانی با موفقیت انجام شد'
          })
        }
      }).catch(error => res.send({ success: false, message: error.message }))
  }
}

export default OrderController;
