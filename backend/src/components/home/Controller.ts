import { NextFunction, Request, Response } from "express";
import ITransformer from "../contracts/ITransformer";
import IProducts from "../product/model/IProduct";
import IProductRepository from "../product/repositories/IProductRepository";
import ProductMongoRepository from "../product/repositories/ProductMongoRepository";
import Transformer from './Transformer'

export default class Controller {
    private readonly productRepository: IProductRepository
    private readonly productTransformer: ITransformer<IProducts>
    constructor() {
        this.productRepository = new ProductMongoRepository()
        this.productTransformer = new Transformer()
        this.list = this.list.bind(this)
    }

    public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        const latest = await this.productRepository.findMany({}, undefined, { perPage: 6, offset: 0 }, { created_at: -1 })
        const bestSellers = await this.productRepository.findMany({}, undefined, { perPage: 6, offset: 0 }, { purchase_count: -1 })
        const popular = await this.productRepository.findMany({}, undefined, { perPage: 6, offset: 0 }, { total_score: -1 })
        const mostViewed = await this.productRepository.findMany({}, undefined, { perPage: 6, offset: 0 }, { views_count: -1 })

        res.send({
            latest: await this.productTransformer.collection(latest),
            best_sellers: await this.productTransformer.collection(bestSellers),
            popular: await this.productTransformer.collection(popular),
            most_viewed: await this.productTransformer.collection(mostViewed),
        })

    }

}