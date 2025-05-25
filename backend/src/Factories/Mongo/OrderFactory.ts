import { fakerFA as faker } from "@faker-js/faker";
import OrderModel from "../../components/order/model/Order";
import IOrder from "../../components/order/model/IOrder";
import IUser from "../../components/users/model/IUser";
import { create as createUser } from "./UserFactory";
import { create as createProduct } from "./ProductFactory";
import { create as createCoupon } from "./CouponFactory";
import IOrderLine from "../../components/order/model/IOrderLine";
import IProducts from "../../components/product/model/IProduct";
import OrderStatus from "../../components/order/model/OrderStatus";

export async function buildOrderLines(
  count: number = 1,
  params?: Partial<IOrderLine>
) {
  const orderLines: Partial<IOrderLine>[] = [];
  for (let index = 1; index <= count; index++) {
    const product: IProducts[] = await createProduct(1);
    orderLines.push({
      product: product[0]._id as unknown as string,
      price: product[0].price,
      discountedPrice: product[0].discountedPrice,
      count: faker.number.int({ min: 1, max: 10 }),
    });
  }
  return orderLines;
}

export async function create(count: number = 1, params?: Partial<IOrder>) {
  const orders: IOrder[] = [];
  const coupon = Math.random() > 0.5 ? await createCoupon(1) : null;
  for (let index = 1; index <= count; index++) {
    const orderLines = await buildOrderLines(faker.number.int({ min: 1, max: 6 }) + 1);
    const user: IUser[] = await createUser(1);
    const defaultOrderParams = {
      user: user[0]._id,
      totalPrice: orderLines.reduce<number>(
        (total: number, current: Partial<IOrderLine>) => total + current.price!,
        0
      ),
      finalPrice: orderLines.reduce<number>(
        (total: number, current: Partial<IOrderLine>) =>
          total + current.discountedPrice!,
        0
      ),
      orderLines: orderLines,
      coupon: coupon ? coupon[0]._id : null,
      deliveryAddress: user[0].addresses,
      status: faker.helpers.arrayElement([
        OrderStatus.PENDING,
        OrderStatus.PAID_IN_PROGRESS,
        OrderStatus.DELIVERED,
        OrderStatus.CANCELED,
        OrderStatus.REFUNDED,
      ]),
    };
    const orderParams = { ...defaultOrderParams, ...params };
    const newOrder = new OrderModel(orderParams);
    await newOrder.save();
    orders.push(newOrder);
  }
  return orders;
}
