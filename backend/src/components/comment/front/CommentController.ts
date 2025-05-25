import { NextFunction, Request, Response } from "express";
import ITransformer from "../../contracts/ITransformer";
import IRepository from "../../contracts/IRepository";
import IComment from "../model/IComment";
import CommentMongoRepository from "../repositories/CommentMongoRepository";
import CommentTransformer from "./CommentTransformer";
import { verify } from "../../../services/JWTService";
import ProductMongoRepository from "../../product/repositories/ProductMongoRepository";
import IProducts from "../../product/model/IProduct";
import NotFoundException from "../../exceptions/NotFoundException";

export default class CommentController {
    private readonly commentRepository: IRepository<IComment>
    private readonly commentTransformer: ITransformer<IComment>
    constructor() {
        this.commentRepository = new CommentMongoRepository()
        this.commentTransformer = new CommentTransformer()
        this.store = this.store.bind(this)
    }

    public async store(req: Request, res: Response, next: NextFunction) {
        const productRepository: IRepository<IProducts> = new ProductMongoRepository()
        try {
            const { id } = await verify(req.headers.authorization as string)
            const product = await productRepository.findOne(req.body.product)

            if (!product) {
                throw new NotFoundException("محصول مورد نظر یافت نشد.")
            }

            const data = {
                user: id,
                product: req.body.product,
                title: req.body.title,
                body: req.body.body,
            }
            const score = (parseFloat(req.body.rate) + parseFloat(product.total_score as unknown as string)) / 2
            const updateProduct = await productRepository.updateOne({ _id: req.body.product }, { total_score: score, comments_count: product.comments_count + 1 })

            const result = await this.commentRepository.create(data)
            if (result) {
                return res.send({
                    success: true,
                    message: "دیدگاه شما با موفقیت ثبت شد"
                })
            }
            res.send({
                success: false,
                message: "خطایی در رخ داده لطفا مجددا امتحان نمایید"
            })
        } catch (error) {
            next(error)
        }
    }
}