import { Request, Response } from "express";
import ProductMongoRepository from "../repositories/ProductMongoRepository";
import IProducts from "../model/IProduct";
import IProductRepository from "../repositories/IProductRepository";
import ITransformer from "../../contracts/ITransformer";
import ProductTransformer from "./Transformer";
import CommentMongoRepository from "../../comment/repositories/CommentMongoRepository";
import CommentTransformer from "../../comment/admin/CommentTransformer";


class Controller {
    private readonly productRepository: IProductRepository;
    private readonly productTransformer: ITransformer<IProducts>
    constructor() {
        this.productRepository = new ProductMongoRepository()
        this.productTransformer = new ProductTransformer()
        this.index = this.index.bind(this)
        this.find = this.find.bind(this)
        this.comments = this.comments.bind(this)
    }
    public async index(req: Request, res: Response) {
        const perPage = 9
        const page = req.query || 1
        const offset = Math.ceil((page as unknown as number - 1) / perPage)
        const products = await this.productRepository.findMany({}, [], { perPage, offset }, { created_at: -1 })

        if (!products) {
            res.status(404).send({
                success: false,
                message: "محصولی یافت نشد!"
            })
        }
        res.send(this.productTransformer.collection(products))
    }
    public async find(req: Request, res: Response) {
        const { id } = req.params
        const singleProduct = await this.productRepository.findOne(id as string,['category'])
        
        
        
        if (!singleProduct) {
            res.status(404).send({
                success: false,
                message: "محصولی یافت نشد!"
            })
        }

        res.send(this.productTransformer.transform(singleProduct as IProducts))
    }
    public async comments(req: Request, res: Response) {
        const commentRepository = new CommentMongoRepository()
        const commentTransformer = new CommentTransformer()
        const { id } = req.params

        const comments = await commentRepository.findByProduct(id, ['user'])

        if (!comments) {
            return res.status(404).send({
                success: false,
                message: "محصولی یافت نشد!"
            })
        }

        res.send(commentTransformer.collection(comments))

    }
}

export default Controller