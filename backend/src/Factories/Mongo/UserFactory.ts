import { fakerFA as faker } from "@faker-js/faker";
import UserModel from "../../components/users/model/User";
import IUser from "../../components/users/model/IUser";
import IAddress from "../../components/users/model/IAddress";
import { create as createAddress } from "./AddressFactory"

export async function create(count: number = 1, params?: Partial<IUser>) {
  const newUsers: IUser[] = [];
  const address: Partial<IAddress>[] = await createAddress(faker.number.int({ min: 1, max: 6 }))
  for (let index = 1; index <= count; index++) {
    const defaultUserParams = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      mobile: faker.phone.number(),
      addresses: address,
      totalOrders: 0,
      wallet: 0,
    };
    const userParams = { ...defaultUserParams, ...params };
    const newUser = new UserModel(userParams);
    await newUser.save();
    newUsers.push(newUser);
  }
  return newUsers;
}
