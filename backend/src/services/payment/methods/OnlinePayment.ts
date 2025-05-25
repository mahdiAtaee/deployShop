import IOrder from "../../../components/order/model/IOrder";
import IPaymentRequest from "../contracts/IPaymentRequest";
import PaymentMethod from "../contracts/PaymentMethod";
import GatewayMethodFactory from "../GatewayMethodFactory";

export default class OnlinePayment implements PaymentMethod {
    private gateway: string = 'zarinpal'
    private readonly gatewayMethodFactory: GatewayMethodFactory
    constructor() {
        this.gatewayMethodFactory = new GatewayMethodFactory;
    }
    public async doPayment(order: IOrder): Promise<any> {
        const onlineGateway = this.gatewayMethodFactory.make(this.gateway)
        const paymentRequest: IPaymentRequest = {
            amount: order.finalPrice,
            description: `پرداخت بابت سفارش شماره${order.id}`
        }
        return onlineGateway.paymentRequest(paymentRequest)
    }

    public setGateway(gateway: string) {
        this.gateway = gateway
    }
}