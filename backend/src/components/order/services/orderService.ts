import IBasketItem from "src/components/basket/IBasketItem";
import NotFoundException from "../../exceptions/NotFoundException";
import IOrder from "../model/IOrder";
import OrderStatus from "../model/OrderStatus";
import IOrderRepository from "../repositories/IOrderRepository";
import OrderMongoRepository from "../repositories/OrderMongoRepository";
import StatusVerifier from "./StatusVerfier";

export default class OrderService {
    private readonly orderRepository: IOrderRepository
    private readonly statusVerifier
    constructor() {
        this.orderRepository = new OrderMongoRepository()
        this.statusVerifier = new StatusVerifier()
        this.updateStatus = this.updateStatus.bind(this)
    }
    public async updateStatus(orderID: string, newStatus: OrderStatus): Promise<boolean> {
        const order: IOrder | null = await this.orderRepository.findOne(orderID)
        if (!order) {
            throw new NotFoundException("سفارش مورد نظر یافت نشد!")
        }
        const canBeStartTransition = this.statusVerifier.verify(newStatus as OrderStatus, order.status as OrderStatus)
        if (canBeStartTransition) {
            const updateResult = await this.orderRepository.updateOne({ _id: orderID }, { status: newStatus })
            if (updateResult) return true
        }
        return false
    }
    public async addOrder(orderData: any): Promise<IOrder | boolean> {
        
        const newOrder = await this.orderRepository.create({
            user: orderData.userID,
            totalPrice: orderData.items.reduce((total: number, item: IBasketItem) => (total + (item.price * item.count)), 0),
            finalPrice: orderData.items.reduce((total: number, item: IBasketItem) => (total + (item.discountedPrice * item.count)), 0),
            coupon: orderData.coupon,
            deliveryAddress: orderData.deliveryAddress,
            orderLines: orderData.items.map((item: IBasketItem) => ({
                product: item.productID,
                price: item.price,
                discountedPrice: item.discountedPrice,
                count: item.count
            }))
        })
        if (newOrder) {
            return newOrder
        }
        return false
    }
}