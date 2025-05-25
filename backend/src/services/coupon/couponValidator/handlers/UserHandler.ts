import ICoupon from "src/components/coupon/model/ICoupon";
import IUser from "src/components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

class UserHandler extends AbstractCouponHandler {
  public process(coupon: ICoupon, user?: IUser): ICoupon | null {
    if (coupon.constraints && 'users' in coupon.constraints) {
      const { users } = coupon.constraints;
      if (user && users && users.length > 0 && users.includes(user.id)) {
        throw new Error("این کد تخفیف مربوط به شخص دیگری است");
      }
    }
    return super.process(coupon, user);
  }
}
export default UserHandler;
