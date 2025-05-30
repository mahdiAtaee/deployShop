import { NextFunction, Request, Response } from "express";
import ProductMongoRepository from "../repositories/ProductMongoRepository";
import IProducts, { IProductPopulated } from "../model/IProduct";
import IProductRepository from "../repositories/IProductRepository";
import ITransformer from "../../contracts/ITransformer";
import ProductTransformer from "./Transformer";
import CommentMongoRepository from "../../comment/repositories/CommentMongoRepository";
import CommentTransformer from "../../comment/admin/CommentTransformer";
import * as _ from 'lodash'
import NotFoundException from "../../exceptions/NotFoundException";
import ICategoryRepository from "../../category/repositories/ICategoryRepository";
import CategoryMongoRepository from "../../category/repositories/CategoryMongoRepository";


class Controller {
    private readonly productRepository: IProductRepository;
    private readonly productTransformer: ITransformer<IProducts>
    constructor() {
        this.productRepository = new ProductMongoRepository()
        this.productTransformer = new ProductTransformer()
        this.index = this.index.bind(this)
        this.find = this.find.bind(this)
        this.comments = this.comments.bind(this)
        this.categoryProducts = this.categoryProducts.bind(this)
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

    public async find(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const singleProduct = await this.productRepository.findOne(id as string, ['category'])


            if (!singleProduct) {
                throw new NotFoundException('محصول مورد نظر یافت نشد!')
            }

            // grouped category
            const product = singleProduct as unknown as IProductPopulated
            const grouped = _.groupBy(product.attributes, 'filterGroupId')
            const specs = Object.entries(grouped).map(([groupID, attributes]) => {
                const group = product.category.filterGroups.find(g => g.hash === groupID)


                return {
                    groupTitle: group?.name || groupID,
                    attributes: attributes.map(attr => {
                        const filter = group?.filters.find(f => f.slug === attr.filterKey);

                        return {
                            label: filter?.name?.fa || attr.filterKey,
                            value: attr.displayValue?.fa || attr.value
                        };
                    })
                };
            })

            const plainProduct = {
                ...singleProduct.toObject(),
                attributes: specs
            };


            res.send(this.productTransformer.transform(plainProduct as IProducts))
        } catch (error) {
            next(error)
        }
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

    public async categoryProducts(req: Request, res: Response, next: NextFunction) {
        const categoryRepository: ICategoryRepository = new CategoryMongoRepository()
        const { key: slug } = req.params

        const perPage = 9
        const page = req.query || 1
        const offset = Math.ceil((page as unknown as number - 1) / perPage)
        try {
            const category = await categoryRepository.findBySlug(slug)
            const products = await this.productRepository.findMany({ 'category': category?._id }, ['category'], { perPage, offset }, { created_at: -1 })


            if (!products || products.length === 0) {
                throw new NotFoundException('محصولی یافت نشد!')
            }

            res.send({
                success: true,
                category,
                products: this.productTransformer.collection(products)
            })
        }
        catch (error) {
            next(error)
        }
    }
}

export default Controller