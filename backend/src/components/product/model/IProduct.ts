import { Document } from "mongoose";
import ProductStatus from "./productStatus";
import IProductAttribute from "./IProductAttribute";
import IAttributeGroup from "./IAttributeGroup";
import IProductVariation from "./IProductVariation";
import IPriceVariation from "./IPriceVariation";
import ICategory from "../../category/model/ICategory";

export default interface IProducts extends Document {
  title: string;
  price: number;
  discountedPrice: number;
  thumbnail?: string;
  thumbnailUrl?: string;
  gallery?: string[];
  galleryUrl?: string[];
  category: string;
  // attributes: IAttributeGroup[];
  attributes: any,
  variation: IProductVariation[];
  priceVariation: IPriceVariation[];
  created_at: Date;
  updated_at: Date;
  stock: number;
  purchase_count: number,
  comments_count: number,
  total_score: number,
  views_count: number,
  status: ProductStatus;
  description: string
}

export interface IProductPopulated extends Omit<IProducts, 'category'> {
  category: ICategory;
}