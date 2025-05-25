import OrderStatus from "../../../model/OrderStatus";
import Handler from "../Handler";

export default class PendingToDelivered extends Handler {
    protected process(newStatus: OrderStatus, oldStatus: OrderStatus): boolean {
        if (oldStatus == OrderStatus.PENDING && newStatus == OrderStatus.REFUNDED) {
            throw new Error("تغییر وضعیت از در حال بررسی به تحویل داده شده امکان پذیر نمی باشد")
        }
        return true
    }
}