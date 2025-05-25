import IPayment from "../model/IPayment";
import ITransformer from "../../contracts/ITransformer";
import DateService from "../../../services/DateService";


export default class PaymentTransformer implements ITransformer<IPayment> {
    private readonly dateService: DateService
    constructor(){
        this.dateService = new DateService()
    }
    transform(item: IPayment) {
        return {
            id: item._id,
            user: this.getUser(item.user),
            order: this.getOrder(item.order),
            amount: item.amount,
            method: item.method,
            reserve: item.reserve,
            reference: item.reference,
            status: item.status,
            created_at: this.dateService.toJalali(item.created_at),
            updated_at: this.dateService.toJalali(item.updated_at),
        }
    }

    collection(items: IPayment[]) {
        return items.map(((item: IPayment) => this.transform(item)))
    }

    private getUser(user: any) {
        if (!user) {
            return null
        }

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    }
    private getOrder(order: any) {
        return {
            id: order._id
        }
    }
}