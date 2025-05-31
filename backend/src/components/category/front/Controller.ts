import { NextFunction, Request, Response } from "express";
import CategoryMongoRepository from "../repositories/CategoryMongoRepository";
import ICategoryRepository from "../repositories/ICategoryRepository";
import ProductMongoRepository from "../../product/repositories/ProductMongoRepository";
import NotFoundException from "../../exceptions/NotFoundException";
import Transformer from "../../product/front/Transformer";
import * as _ from 'lodash'

class Controller {
    private readonly categoryRepository: ICategoryRepository;
    constructor() {
        this.categoryRepository = new CategoryMongoRepository();
        this.list = this.list.bind(this)
        this.products = this.products.bind(this)
    }

    public async list(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.categoryRepository.findMany({}, [], { perPage: 40, offset: 0 });
            return res.send({ success: true, categories });
        } catch (error) {
            next(error)
        }
    }

    public async products(req: Request, res: Response, next: NextFunction) {
        console.log("in product category",req.body);
        
        const productRepository = new ProductMongoRepository()
        const productTransformer = new Transformer()
        try {
            const { slug } = req.params
            const category = await this.categoryRepository.findBySlug(slug)
            if (!category) {
                throw new NotFoundException("دسته بندی مورد نظر یافت نشد")
            }
            const productQuery: any = {
                category: category._id
            }
            const rowQuery = req.query
            delete rowQuery['slug']
            if (_.size(rowQuery) > 0) {
                const titles: string[] = []
                const slugs: string[] = []

                _.forEach(rowQuery, (value, key) => {
                    const values = value as string
                    titles.push(key)
                    if (values.includes(',')) {
                        slugs.push(...values.split(','))
                    } else {
                        slugs.push(values)
                    }
                })
                productQuery['attributes.title'] = { $in: titles }
                productQuery['attributes.attributes.slug'] = { $in: slugs }
            }

            const products = await productRepository.findMany(productQuery)
            res.send({
                success: true,
                products: productTransformer.collection(products),
                category
            })
        } catch (error) {
            next(error)
        }
    }
}

export default Controller;