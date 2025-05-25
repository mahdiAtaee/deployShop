import ServerException from "../../components/exceptions/ServerException";
import PaymentMethod from "./contracts/PaymentMethod";
import CODPayment from "./methods/CODPayment";
import GiftPayment from "./methods/GiftPayment";
import OnlinePayment from "./methods/OnlinePayment";

class PaymentMethodFactory {
    private methods: Map<string, PaymentMethod> = new Map<string, PaymentMethod>()
    constructor() {
        this.methods.set('online', new OnlinePayment)
        this.methods.set('COD', new CODPayment)
        this.methods.set('gift', new GiftPayment)
    }
    public make(method: string): PaymentMethod {
        if (!this.methods.has(method)) {
            throw new ServerException("روش پرداخت معتبر نمی باشد")
        }
        return this.methods.get(method) as PaymentMethod
    }
}

export default PaymentMethodFactory