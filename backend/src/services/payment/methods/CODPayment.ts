import PaymentMethod from "../contracts/PaymentMethod";

export default class CODPayment implements PaymentMethod{
    doPayment(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}