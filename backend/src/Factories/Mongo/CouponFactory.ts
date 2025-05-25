import { faker } from "@faker-js/faker";
import CouponModel from "../../components/coupon/model/Coupon"
import ICoupon from "../../components/coupon/model/ICoupon";
import CouponStatus from "../../components/coupon/model/CouponStatus";

export async function create(count: number = 1, params?: Partial<ICoupon>) {
  const Coupons: ICoupon[] = [];
  for (let index = 1; index <= count; index++) {
    const defaultCouponParams = {
      code: faker.string.alphanumeric(),
      percent: faker.number.int(99),
      limit: faker.number.int(10),
      used: 0,
      expires_at: faker.date
        .future({ years: 10, refDate: "2020-01-01T00:00:00" })
        .toLocaleDateString(),
      constraints: {},
      status: faker.helpers.arrayElement([
        CouponStatus.ACTIVE,
        CouponStatus.INACTIVE,
      ]),
    };
    const CouponParams = { ...defaultCouponParams, ...params };
    const newCoupon = new CouponModel(CouponParams);
    await newCoupon.save();
    Coupons.push(newCoupon);
  }
  return Coupons;
}
