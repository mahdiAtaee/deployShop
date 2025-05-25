import { Document } from "mongoose";
import ProductStatus from "./productStatus";
import IProductAttribute from "./IProductAttribute";
import IAttributeGroup from "./IAttributeGroup";
import IProductVariation from "./IProductVariation";
import IPriceVariation from "./IPriceVariation";

export default interface IProducts extends Document {
  title: string;
  price: number;
  discountedPrice: number;
  thumbnail?: string;
  thumbnailUrl?: string;
  gallery?: string[];
  galleryUrl?: string[];
  category: string;
  attributes: IAttributeGroup[];
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
