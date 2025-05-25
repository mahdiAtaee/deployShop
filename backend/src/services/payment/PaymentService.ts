import IPaymentRepository from "../../components/payment/repositories/IPaymentRepository";
import IOrder from "../../components/order/model/IOrder";
import PaymentMongoRepository from "../../components/payment/repositories/PaymentMongoRepository";
import { v4 as UUID } from "uuid";
import PaymentMethodFactory from "./PaymentMethodFactory";
import OnlinePayment from "./methods/OnlinePayment";

export default class PaymentService {
    private readonly paymentRepository: IPaymentRepository
    private readonly paymentMethodFactory: PaymentMethodFactory
    constructor() {
        this.paymentRepository = new PaymentMongoRepository()
        this.paymentMethodFactory = new PaymentMethodFactory()
    }
    public async payOrder(order: IOrder, method: string) {
        const newPayment = await this.paymentRepository.create({
            user: order.user,
            order: order.id,
            amount: order.finalPrice,
            method,
            reserve: UUID()
        })
        const paymentProvider = this.paymentMethodFactory.make('online')
        if (paymentProvider instanceof OnlinePayment) {
            paymentProvider.setGateway(method)
        }
        
        return paymentProvider.doPayment(order)
    }
}