import DateService from "../../services/DateService";
import ITransformer from "../contracts/ITransformer";
import IProducts from "../product/model/IProduct";

export default class Transformer implements ITransformer<IProducts> {
    private readonly dateService: DateService
    constructor() {
        this.dateService = new DateService()
    }
    public transform(item: IProducts): Partial<IProducts> {
        return {
            id: item._id,
            title: item.title,
            price: item.price,
            stock: item.stock,
            attributes: item.attributes,
            category: item.category,
            discountedPrice: item.discountedPrice,
            thumbnail: item.thumbnail,
            gallery: item.gallery,
        };
    }

    public collection(items: IProducts[]): Partial<IProducts>[] {
        return items.map((item: IProducts) => this.transform(item));
    }
}