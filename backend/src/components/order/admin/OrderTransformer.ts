import DateService from "../../../services/DateService";
import ITransformer from "../../contracts/ITransformer";
import IOrders from "../model/IOrder";

export default class ProductTransformer implements ITransformer<IOrders> {
  private readonly DateService: DateService;
  constructor() {
    this.DateService = new DateService();
  }
  transform(item: IOrders) {
    return {
      id: item._id,
      user: this.getUser(item.user),
      totalPrice: item.totalPrice,
      finalPrice: item.finalPrice,
      coupon: this.getCoupon(item.coupon),
      deliveryAddress: item.deliveryAddress,
      orderLines: item.orderLines,
      status: item.status,
      created_at: this.DateService.toJalali(item.created_at),
      updated_at: this.DateService.toJalali(item.updated_at),
    };
  }
  collection(items: IOrders[]) {
    return items.map((item: IOrders) => this.transform(item));
  }
  private getUser(user: any) {
    if (!user) {
      return null;
    }
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
  private getCoupon(coupon: any) {
    if (!coupon) {
      return null;
    }
    return {
      code: coupon.code,
      percent: coupon.percent,
    };
  }
}
