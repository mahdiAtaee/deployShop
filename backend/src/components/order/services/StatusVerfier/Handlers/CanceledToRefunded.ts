import OrderStatus from "../../../model/OrderStatus";
import Handler from "../Handler";

export default class CanceledToRefunded extends Handler {
    protected process(newStatus: OrderStatus, oldStatus: OrderStatus): boolean {
        if (oldStatus == OrderStatus.PENDING && newStatus == OrderStatus.REFUNDED) {
            throw new Error("تغییر وضعیت از لغو شده به مرجوع شده امکان پذیر نمی باشد")
        }
        return true
    }
}