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
        this.details = this.details.bind(this)
        this.search = this.search.bind(this)
    }
    public async index(req: Request, res: Response, next: NextFunction) {
        try {
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
        } catch (error) {
            console.log(error);
            next(error)

        }
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
        const page = req.query.page || 1
        const offset = Math.ceil((page as unknown as number - 1) / perPage)
        try {
            const category = await categoryRepository.findBySlug(slug)

            const productQuery: any = {
                'category': category?._id
            }

            const rowQuery = { ...req.query }
            delete rowQuery['slug']

            const filters: { filterKey: string; value: string | number }[] = []

            for (const [key, value] of Object.entries(rowQuery)) {
                const raw = value as string;
                const newRaw = decodeURIComponent(raw);
                const values = newRaw.split(',') ? newRaw.split(',') : [newRaw];

                for (const val of values) {
                    filters.push({
                        filterKey: key,
                        value: val
                    });
                }
            }

            if (filters.length > 0) {
                const filterQuery = this.buildAttributeFilterQuery(filters);
                Object.assign(productQuery, filterQuery);
            }

            const products = await this.productRepository.findMany(productQuery, ['category'], { perPage, offset }, { created_at: -1 })


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

    private buildAttributeFilterQuery(filters: { filterKey: string; value: string | number }[]) {
        const grouped = _.groupBy(filters, 'filterKey');

        const andConditions = Object.entries(grouped).map(([filterKey, groupValues]) => {
            const orConditions: any[] = [];

            for (const { value } of groupValues) {
                const rangeMatch = typeof value === 'string' && value.match(/^(\d+)-(\d+)$/);
                if (rangeMatch) {
                    const min = Number(rangeMatch[1]);
                    const max = Number(rangeMatch[2]);
                    orConditions.push({ numericValue: { $gte: min, $lte: max } });
                } else {
                    orConditions.push({ value }, { filterValue: value });

                    const num = Number(value);
                    if (!isNaN(num)) {
                        orConditions.push({ numericValue: num });
                    }
                }
            }

            return {
                attributes: {
                    $elemMatch: {
                        filterKey,
                        $or: orConditions
                    }
                }
            };
        });

        return { $and: andConditions };
    }

    public async details(req: Request, res: Response, next: NextFunction) {
        const commentRepository = new CommentMongoRepository()
        const commentTransformer = new CommentTransformer()
        try {
            const { id } = req.params

            const product = await this.productRepository.findOne(id as string, ['category'])
            if (!product) {
                throw new NotFoundException('محصول مورد نظر یافت نشد!')
            }

            const comments = await commentRepository.findByProduct(id, ['user'])


            const relatedProducts = await this.productRepository.findMany({
                category: typeof product.category === 'object' && product.category !== null && '_id' in product.category
                    ? (product.category as { _id: string })._id
                    : product.category,
                _id: { $ne: product._id } // Exclude the current product
            }, ['category'], { perPage: 5, offset: 0 }, { created_at: -1 })



            // grouped attributes by filterGroup
            const productWithDetails = product as unknown as IProductPopulated
            const grouped = _.groupBy(productWithDetails.attributes, 'filterGroupId')

            // map grouped attributes to specs
            // each group has a title and attributes
            const specs = Object.entries(grouped).map(([groupID, attributes]) => {
                // find group by hash
                // groupID in product attribute is the hash of the filterGroup in category
                const group = productWithDetails.category.filterGroups.find(g => g.hash === groupID)

                return {
                    groupTitle: group?.name || groupID,
                    attributes: attributes.map(attr => {
                        // find filter by slug in group
                        // attr.filterKey in product attribute is the slug of the filter in group category
                        const filter = group?.filters.find(f => f.slug === attr.filterKey)

                        return {
                            label: filter?.name?.fa || attr.filterKey,
                            value: attr.displayValue?.fa || attr.value
                        }
                    })
                }
            })

            const plainProduct = {
                ...product.toObject(),
                attributes: specs
            }



            res.send({
                success: true,
                product: this.productTransformer.transform(plainProduct as IProducts),
                comments: commentTransformer.collection(comments),
                relatedProducts: this.productTransformer.collection(relatedProducts)
            })
        } catch (error) {
            console.log(error);

            next(error)
        }
    }

    public async search(req: Request, res: Response, next: NextFunction) {
        try {
            const { q } = req.query
            
            if (!q || typeof q !== 'string') {
                return res.status(400).send({
                    success: false,
                    message: "لطفا یک عبارت جستجو وارد کنید!"
                })
            }


            const products = await this.productRepository.findMany({ $text: { $search: q } }, ['category'], { perPage: 9, offset: 0 }, { created_at: -1 })
            
            
            if (!products || products.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: "محصولی یافت نشد!"
                })
            }

            res.send(this.productTransformer.collection(products))
        } catch (error) {
            console.log(error);
            
            next(error)
        }
    }
}

export default Controller