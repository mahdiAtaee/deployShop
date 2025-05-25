import { fakerFA as faker } from "@faker-js/faker";
import ProductModel from "../../components/product/model/Product";
import IUser from "../../components/users/model/IUser";
import IAttribute from "../../components/category/model/IAttribute";
import IProductVariation, {
  IProductVariationItem,
} from "../../components/product/model/IProductVariation";
import IProducts from "../../components/product/model/IProduct";
import IPriceVariation from "../../components/product/model/IPriceVariation";
import { create as CategoryFactory } from "./CategoryFactory";
import IAttributeGroup from "../../components/product/model/IAttributeGroup";
import IProductAttribute from "../../components/product/model/IProductAttribute";
import ProductStatus from "../../components/product/model/productStatus";

const randomNumber: number = Math.round(Math.random() * 10);


export async function makeAttributesItem(
  count: number = 1,
  params?: Partial<IProductAttribute>
) {
  const attributes: IProductAttribute[] = [];
  for (let index = 0; index < count; index++) {
    const defaultAttributeParams = {
      title: faker.commerce.productAdjective(),
      slug: faker.lorem.slug(),
      value: faker.lorem.text(),
      filterable: randomNumber > 5 ? true : false,
      hasPrice: randomNumber > 5 ? true : false,
    };
    const finalizeAttribute = { ...defaultAttributeParams, ...params };
    attributes.push(finalizeAttribute);
  }
  return attributes;
}

export async function makeAttributes(
  count: number = 1,
  params?: Partial<IAttributeGroup>
) {
  const attributeGroups: IAttributeGroup[] = [];
  const attributes: IProductAttribute[] = await makeAttributesItem(2);
  for (let index = 0; index < count; index++) {
    attributeGroups.push({
      title: faker.commerce.productAdjective(),
      attributes,
    });
  }
  return attributeGroups;
}

const makeVariationItems = async (count: number = 1) => {
  const variationItems: IProductVariationItem[] = [];
  for (let index = 1; index <= count; index++) {
    variationItems.push({
      title: faker.lorem.word(),
      value: faker.lorem.word(),
    });
  }
  return variationItems;
};

async function makeProductVariation(
  count: number = 1,
  params?: Partial<IProductVariation>
) {
  const productVariations: IProductVariation[] = [];
  const productVariationItem = await makeVariationItems();
  for (let index = 0; index < count; index++) {
    const defaultVariationParams = {
      title: faker.lorem.sentence(2),
      name: faker.lorem.sentence(1),
      type: faker.helpers.arrayElement(["color", "size", "material"]),
      items: productVariationItem,
    };
    const finalizeVariation = { ...defaultVariationParams, ...params };
    productVariations.push(finalizeVariation);
  }
  return productVariations;
}

const makePriceVariationItems = async (
  count: number = 1,
  variations: IProductVariation[]
) => {
  const variationItems: object[] = [];
  for (let index = 1; index <= count; index++) {
    const variation = faker.helpers.arrayElement(variations);
    if (variation) {
      const item = faker.helpers.arrayElement<IProductVariationItem>(
        variation.items
      );
      if (item) {
        variationItems.push({ [variation.name]: item.value });
      }
    }
  }
  return variationItems;
};

const makePriceVariations = async (
  count: number = 1,
  variations: IProductVariation[]
) => {
  const priceVariations: IPriceVariation[] = [];

  for (let index = 1; index <= count; index++) {
    const items = await makePriceVariationItems(
      faker.number.int(10),
      variations
    );
    priceVariations.push({
      price: faker.commerce.price() as unknown as number,
      items,
    });
  }
  return priceVariations;
};

export async function create(count: number = 1, params?: Partial<IUser>) {
  const newUsers: IUser[] = [];
  const newProducts: IProducts[] = [];
  const attributes = await makeAttributes(5);
  const variation = await makeProductVariation(2);
  const priceVariation = await makePriceVariations(10, variation);
  const categories = await CategoryFactory(1);
  for (let index = 1; index <= count; index++) {
    const defaultProductParams = {
      title: faker.commerce.productName(),
      price: faker.commerce.price({ min: 100, max: 900, dec: 0 }),
      discountedPrice: faker.commerce.price({ min: 500, max: 800, dec: 0 }),
      thumbnail: faker.image.url(),
      gallery: [faker.image.url()],
      category: categories[0]._id,
      attributes,
      variation,
      priceVariation,
      stock: faker.number.int(100),
      purchase_count: faker.number.int(100),
      comments_count: faker.number.int(100),
      total_score: faker.number.float({ min: 0, max: 5, fractionDigits: 1 }),
      views_count: faker.number.int(100000),
      status: faker.helpers.arrayElement([
        ProductStatus.INIT,
        ProductStatus.INACTIVE,
        ProductStatus.PUBLISHED
      ])
    };
    const ProductParams = { ...defaultProductParams, ...params };
    const newProduct = new ProductModel(ProductParams);
    await newProduct.save();
    newProducts.push(newProduct);
  }
  return newProducts;
}
