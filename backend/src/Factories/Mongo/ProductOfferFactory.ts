import { faker } from "@faker-js/faker";
import IProductOffer from "../../components/product_offer/model/IProductOffer";
import ProductOfferModel from "../../components/product_offer/model/ProductOffer"
import IUser from "../../components/users/model/IUser";
import { create as createUser } from "./UserFactory"
import { create as createOrder } from "./OrderFactory"
import IOrder from "../../components/order/model/IOrder";
import IProducts from "../../components/product/model/IProduct";
import { create as createProduct } from "./ProductFactory"

const buildProductOfferItem = async (count: number = 1) => {
    const ProductOffers = []
    const product: IProducts[] = await createProduct(1)
    for (let index = 0; index < count; index++) {
        const defaultProductOfferParams = {
            product: product[0]._id,
            image: faker.image.url(),
            price: faker.commerce.price(),
        }
        const newProductOffer = new ProductOfferModel(defaultProductOfferParams)
        await newProductOffer.save()
        ProductOffers.push(newProductOffer)
    }
    return ProductOffers
}

export const create = async (count: number = 1, params?: Partial<IProductOffer>) => {
    const ProductOffers = []
    const productOfferItem = await buildProductOfferItem(1)
    const user: IUser[] = await createUser(1)
    const order: IOrder[] = await createOrder(1)
    for (let index = 0; index < count; index++) {
        const defaultProductOfferParams = {
            products: [productOfferItem],
            start_date: faker.date.soon(),
            end_date: faker.date.future(),
        }
        const ProductOfferParams = { ...defaultProductOfferParams, ...params }
        const newProductOffer = new ProductOfferModel(ProductOfferParams)
        await newProductOffer.save()
        ProductOffers.push(newProductOffer)
    }
    return ProductOffers
}