import { buildAvatar } from "../../../services/AvatarService";
import DateService from "../../../services/DateService";
import ITransformer from "../../contracts/ITransformer";
import IComments from "../model/IComment";

export default class CommentTransformer implements ITransformer<IComments> {
    private readonly DateService: DateService;
    constructor() {
        this.DateService = new DateService();
    }
    transform(item: IComments) {
        return {
            id: item._id,
            user: this.getUser(item.user),
            product: this.getProduct(item.product),
            title: item.title,
            body: item.body,
            isBuyer: item.isBuyer,
            adviceToBuy: item.adviceToBuy,
            createdAt: this.DateService.toJalali(item.createdAt)
        };
    }
    collection(items: IComments[]) {
        return items.map((item: IComments) => this.transform(item));
    }

    private getUser(user: any) {
        if (!user) {
            return null
        }
        
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: buildAvatar(user.email, 45)
        }
    }

    private getProduct(product: any) {
        if (!product) {
            return null
        }

        return {
            id: product.id,
            title: product.title,
        }
    }
}
