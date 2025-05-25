import IUser from "../../users/model/IUser";
import IRepository from "../../contracts/IRepository";
import IOrder from "../model/IOrder";
import OrderStatus from "../model/OrderStatus";
import IPagination from "../../contracts/IPagination";

export default interface IOrderRepository extends IRepository<IOrder> {
    findByStatus(status: OrderStatus): Promise<IOrder[]>
    findByUserDetails(userParams: Partial<IUser>, relations?: string[], pagination?: IPagination): Promise<IOrder[]>
}