import { fakerFA as faker } from "@faker-js/faker";
import PaymentModel from "../../components/payment/model/Payment";
import IPayment from "../../components/payment/model/IPayment";
import IUser from "../../components/users/model/IUser";
import { create as createUser } from "./UserFactory";
import { create as createOrder } from './OrderFactory'
import PaymentStatus from "../../components/payment/model/PaymentStatus";
import IOrder from "../../components/order/model/IOrder";

export async function create(count: number = 1, params?: Partial<IPayment>) {
    const Payments: IPayment[] = [];
    for (let index = 1; index <= count; index++) {
        const user: IUser[] = await createUser(1);
        const order: IOrder[] = await createOrder(1);
        const defaultPaymentParams = {
            user: user[0]._id,
            order: order[0]._id,
            amount: faker.commerce.price(),
            method: faker.helpers.arrayElement(['آنلاین', 'حضوری']),
            reserve: faker.string.alpha(),
            reference: faker.string.alpha(),
            status: faker.helpers.arrayElement([
                PaymentStatus.PENDING,
                PaymentStatus.FAILED,
                PaymentStatus.SUCCESS
            ]),
        };
        const PaymentParams = { ...defaultPaymentParams, ...params };
        const newPayment = new PaymentModel(PaymentParams);
        await newPayment.save();
        Payments.push(newPayment);
    }
    return Payments;
}
