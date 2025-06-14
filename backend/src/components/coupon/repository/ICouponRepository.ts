import IRepository from "src/components/contracts/IRepository";
import ICoupon from "../model/ICoupon";

export default interface ICouponRepository extends IRepository<ICoupon> {
    findByCode(code: string): Promise<ICoupon | null>
}