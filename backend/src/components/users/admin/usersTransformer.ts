import { buildAvatar } from "../../../services/AvatarService";
import DateService from "../../../services/DateService";
import ITransformer from "../../contracts/ITransformer";
import IUser from "../model/IUser";

export default class UsersTransformer implements ITransformer<IUser> {
    private readonly dateService: DateService
    constructor() {
        this.dateService = new DateService()
        this.collection = this.collection.bind(this)
        this.transform = this.transform.bind(this)
    }
    transform(item: IUser) {
        return {
            id: item._id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            mobile: item.mobile,
            addresses: item.addresses,
            totalOrders: item.totalOrders,
            wallet: item.wallet,
            avatar: buildAvatar(item.email, 45)
        }
    }
    collection(items: IUser[]) {
        return items.map((item: IUser) => this.transform(item))
    }

}