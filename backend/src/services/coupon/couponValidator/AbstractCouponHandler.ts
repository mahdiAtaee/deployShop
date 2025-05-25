import IUser from "src/components/users/model/IUser";
import CouponHandler from "./CouponHandler";
import ICoupon from "src/components/coupon/model/ICoupon";

abstract class AbstractCouponHandler implements CouponHandler {
  private nextHandler: CouponHandler | null = null;

  public setNext(Handler: CouponHandler): CouponHandler {
    this.nextHandler = Handler;
    return Handler;
  }
  public process(coupon: ICoupon, user?: IUser): ICoupon | null {
    if (this.nextHandler) {
      return this.nextHandler.process(coupon, user);
    }
    return null;
  }
}
export default AbstractCouponHandler;
