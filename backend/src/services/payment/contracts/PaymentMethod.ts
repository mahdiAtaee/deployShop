import IOrder from "../../../components/order/model/IOrder";

export default interface PaymentMethod {
    doPayment(order: IOrder): Promise<any>
}