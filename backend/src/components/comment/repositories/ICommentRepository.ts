import IRepository from "../../contracts/IRepository";
import IComment from "../model/IComment";
import IPagination from "../../contracts/IPagination";

export default interface ICommentRepository extends IRepository<IComment> {
    findByProduct(productID: string, relations?: string[], pagination?: IPagination):Promise<IComment[]>
}
