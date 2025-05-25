import { faker } from "@faker-js/faker";
import IShipment from "../../components/shipment/model/IShipment";
import ShipmentStatus from "../../components/shipment/model/ShipmentStatus";
import ShipmentModel from "../../components/shipment/model/Shipment"
import IUser from "src/components/users/model/IUser";
import { create as createUser } from "./UserFactory"
import { create as createOrder } from "./OrderFactory"
import IOrder from "../../components/order/model/IOrder";

export const create = async (count: number = 1, params?: Partial<IShipment>) => {
    const Shipments = []
    const user: IUser[] = await createUser(1)
    const order: IOrder[] = await createOrder(1)
    for (let index = 0; index < count; index++) {
        const defaultShipmentParams = {
            employee: user[0]._id,
            order: order[0]._id,
            selectedDateTime: faker.date.future(),
            deliveryAt: faker.date.future(),
            note: faker.lorem.sentence(1),
            status: faker.helpers.arrayElement([
                ShipmentStatus.ABSENT,
                ShipmentStatus.DELIVERED,
                ShipmentStatus.PENDING,
                ShipmentStatus.PICKED_UP
            ]),
        }
        const ShipmentParams = { ...defaultShipmentParams, ...params }
        const newShipment = new ShipmentModel(ShipmentParams)
        await newShipment.save()
        Shipments.push(newShipment)
    }
    return Shipments
}