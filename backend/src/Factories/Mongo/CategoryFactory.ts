import { faker } from "@faker-js/faker";
import CategoryModel from "../../components/category/model/Category";
import ICategory from "../../components/category/model/ICategory";
import IAttributeCategory from "src/components/category/model/IAttributeCategory";
import IAttribute from "src/components/category/model/IAttribute";
import { makeAttributes } from "./ProductFactory";

const randomNumber: number = Math.round(Math.random() * 10);

export async function makeAttributesItem(
  count: number = 1,
  params?: Partial<IAttribute>
) {
  const attributes: IAttribute[] = [];
  for (let index = 0; index < count; index++) {
    const defaultAttributeParams = {
      name: {
        fa: faker.lorem.word(),
        en: faker.lorem.word(),
      },
      slug: faker.lorem.slug(),
      type: faker.random.arrayElement([]),
      values: [],
      filterable: true,
      hasPrice: false,
    };
    const finalizeAttribute = { ...defaultAttributeParams, ...params };
    attributes.push(finalizeAttribute);
  }
  return attributes;
}


async function makeAttributeGroup(count: number = 1) {
  const attributesGroup: IAttributeCategory[] = [];
  const attributes: IAttribute[] = await makeAttributesItem(10);
  for (let index = 0; index < count; index++) {
    const defaultParams = {
      title: faker.lorem.word(),
      attributes,
    };
    attributesGroup.push(defaultParams);
  }
  return attributesGroup;
}

export async function create(count: number = 1, params?: Partial<ICategory>) {
  const categories: ICategory[] = [];
  const groups: IAttributeCategory[] = await makeAttributeGroup();
  for (let index = 1; index <= count; index++) {
    const defaultUserParams = {
      name: {
        FA: faker.commerce.name(),
        EN: faker.commerce.name(),

      },
      parentId: null,
      level: 1,
      icon: "",
      isActive: true,
      slug: faker.lorem.slug(),
      filterGroups:groups,
    };
    const categoryParams = { ...defaultUserParams, ...params };
    const newCategory = new CategoryModel(categoryParams);
    await newCategory.save();
    categories.push(newCategory);
  }
  return categories;
}
