import { fakerFA as faker } from "@faker-js/faker";
import IAddress from "../../components/users/model/IAddress";

export async function create(
  count: number = 1,
  params?: Partial<IAddress>
) {
  const addresses: Partial<IAddress>[] = [];
  for (let index = 1; index <= count; index++) {
    addresses.push({
      title: faker.helpers.arrayElement(['خانه', 'منزل', 'اداره', 'کارگاه']),
      state: faker.location.state(),
      city: faker.location.city(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      zipCode: faker.location.zipCode(),
      fullName: faker.person.fullName(),
      mobile: faker.phone.number(),
    });
  }
  return addresses;
}
