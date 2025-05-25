import ICoupon from "../model/ICoupon";
import ITransformer from "../../contracts/ITransformer";
import DateService from "../../../services/DateService";


export default class CouponTransformer implements ITransformer<ICoupon> {
    private readonly dateService: DateService
    constructor(){
        this.dateService = new DateService()
    }
    transform(item: ICoupon) {        
        return {
            code: item.code,
            percent: item.percent,
            limit:item.limit,
            used: item.used,
            expires_at: this.dateService.toJalali(item.expires_at),
            constraints: item.constraints,
            status: item.status
        }
    }

    collection(items: ICoupon[]) {        
        return items.map(((item: ICoupon) => this.transform(item)))
    }
}