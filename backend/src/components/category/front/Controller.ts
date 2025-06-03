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
        this.find = this.find.bind(this)
    }

    public async find(req: Request, res: Response, next: NextFunction) {
        try {
            const { slug } = req.params;
            const category = await this.categoryRepository.findBySlug(slug);
            if(!category) {
                throw new NotFoundException("دسته بندی مورد نظر یافت نشد");
            }

            return res.send({ success: true, category });
        } catch (error) {
            next(error)
        }
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

            const products = await productRepository.findMany(productQuery)
            
            res.send({
                success: true,
                products: productTransformer.collection(products),
                category
            })
        } catch (error) {
            console.log("error in category products", error);
            next(error)
        }
    }
}

export default Controller;