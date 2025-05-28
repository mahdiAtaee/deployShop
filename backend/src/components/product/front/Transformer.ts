import DateService from "../../../services/DateService";
import ITransformer from "../../contracts/ITransformer";
import IProducts from "../model/IProduct";

export default class Transformer implements ITransformer<IProducts> {
  private readonly DateService: DateService;
  constructor() {
    this.DateService = new DateService();
  }
  transform(item: IProducts) {
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
      variations: item.variation,
      priceVariations: item.priceVariation,
      totalScore: item.total_score,
      commentCount: item.comments_count,
      description: item.description
    };
  }
  collection(items: IProducts[]) {
    return items.map((item: IProducts) => this.transform(item));
  }
}
