import OrderStatus from "../../../model/OrderStatus";
import Handler from "../Handler";

export default class PaidInProgressToPending extends Handler {
    protected process(newStatus: OrderStatus, oldStatus: OrderStatus): boolean {
        console.log({newStatus,oldStatus})
        console.log(oldStatus === OrderStatus.PAID_IN_PROGRESS)
        console.log(newStatus === OrderStatus.PENDING);
        
        
        if (oldStatus == OrderStatus.PAID_IN_PROGRESS && newStatus == OrderStatus.PENDING) {
            throw new Error("تغییر وضعیت از پرداخت شده به در حال بررسی امکان پذیر نمی باشد")
        }
        return true
    }
}