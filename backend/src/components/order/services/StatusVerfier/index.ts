import OrderStatus from "../../model/OrderStatus";
import CanceledToRefunded from "./Handlers/CanceledToRefunded";
import PaidInProgressToPending from "./Handlers/PaidInProgressToPending";
import PendingToDelivered from "./Handlers/PendingToDelivered";
import PendingToRefunded from "./Handlers/PendingToRefunded";

export default class StatusVerifier {
    private CanceledToRefunded: CanceledToRefunded
    private PendingToRefunded: PendingToRefunded
    private PendingToDelivered: PendingToDelivered
    private PaidInProgressToPending: PaidInProgressToPending

    constructor() {
        this.CanceledToRefunded = new CanceledToRefunded()
        this.PendingToDelivered = new PendingToDelivered(this.CanceledToRefunded)
        this.PendingToRefunded = new PendingToRefunded(this.PendingToDelivered)
        this.PaidInProgressToPending = new PaidInProgressToPending(this.PendingToRefunded)
    }
    public verify(newStatus: OrderStatus, oldStatus: OrderStatus) {
        return this.PaidInProgressToPending.Handle(newStatus, oldStatus)
    }
}