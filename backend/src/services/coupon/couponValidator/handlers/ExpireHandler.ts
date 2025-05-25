import IUser from "src/components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";
import ICoupon from "src/components/coupon/model/ICoupon";

class ExpireHandler extends AbstractCouponHandler {
  public process(coupon: ICoupon, user?: IUser): ICoupon | null {
    const now = new Date();
    if (now > coupon.expires_at) {
      throw new Error("زمان استفاده از این کد تخفیف به اتمام رسیده است");
    }
    return super.process(coupon, user);
  }
}

export default ExpireHandler;
