import DateService from "../../../services/DateService";
import ITransformer from "../../contracts/ITransformer";
import IProducts from "../model/IProduct";

export default class ProductTransformer implements ITransformer<IProducts> {
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
      discountedPrice: item.discountedPrice,
      thumbnail: item.thumbnailUrl,
      gallery: item.galleryUrl,
      status: item.status,
      created_at: this.DateService.toJalali(item.created_at),
      updated_at: this.DateService.toJalali(item.updated_at),
    };
  }
  collection(items: IProducts[]) {
    return items.map((item: IProducts) => this.transform(item));
  }
}
