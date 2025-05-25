import ProductStatus from "../model/productStatus";
import IProductRepository from "./IProductRepository";
import ProductModel from "../model/Product";
import IProducts from "../model/IProduct";
import { FilterQuery } from "mongoose";
import IPagination from "../../contracts/IPagination";
import { Types } from "mongoose";
import IObjectParams from "../../contracts/IObjectParams";
export default class ProductMongoRepository implements IProductRepository {
  public async findByStatus(status: ProductStatus): Promise<IProducts[]> {
    return ProductModel.find({ status });
  }
  public async findOne(ID: string, relations?: string[]): Promise<IProducts | null> {
    const productQuery = ProductModel.findOne({ _id: ID })
    
    if (relations && relations.length > 0) {
      relations.forEach((relation: string) => {
        productQuery.populate(relation)
      })
    }    
    try {
        const product = await productQuery.exec();
        return product;
    } catch (error) {
        console.error('Error finding product:', error);
        return null;
    }
  }
  public async findMany(params: any, relations?: string[], pagination?: IPagination, sort?: any): Promise<IProducts[]> {
    const productQueryParams: IObjectParams = { ...params }
    if (params.category) {
      const objectID = Types.ObjectId
      productQueryParams.category = new objectID(params.category)
    }

    const productQuery = ProductModel.find(productQueryParams)

    if (sort) {
      productQuery.sort(sort)
    }

    if (relations && relations.length > 0) {
      relations.forEach((relation: string) => {
        productQuery.populate(relation)
      })
    }

    if (pagination) {
      productQuery.limit(pagination.perPage).skip(pagination.offset)
    }

    return productQuery.exec();
  }
  public async create(params: any): Promise<IProducts> {
    const newProduct = new ProductModel({ ...params });
    return newProduct.save();
  }
  public async updateOne(
    where: FilterQuery<IProducts>,
    updateData: Partial<IProducts>
  ): Promise<boolean> {
    const product = await ProductModel.updateOne(where, updateData);
    if (product) {
      return true;
    }
    return false;
  }
  public async updateMany(where: any, params: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async deleteOne(ID: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async deleteMany(where: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
