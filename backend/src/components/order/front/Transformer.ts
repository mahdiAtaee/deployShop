import ITransformer from "src/components/contracts/ITransformer";
import IOrder from "../model/IOrder";
import DateService from "../../../services/DateService";

export default class Transformer implements ITransformer<IOrder> {
    private readonly dateService: DateService
    constructor(){
        this.dateService = new DateService()
    }
    transform(item: IOrder) {
        return {
            id: item._id,
            totalPrice: item.totalPrice,
            finalPrice: item.finalPrice,
            deliveryAddress: item.deliveryAddress,
            orderLines: item.orderLines,
            status: item.status,
            created_at: this.dateService.toJalali(item.created_at),
            updated_at: this.dateService.toJalali(item.updated_at),
        }
    }
    collection(items: IOrder[]) {
        return items.map((item: IOrder) => this.transform(item));
    }

}