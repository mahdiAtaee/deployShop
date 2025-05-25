import { Document } from "mongoose";
import IAttributeCategory from "./IAttributeCategory";

export default interface ICategory extends Document {
  name: {
    fa: string,
    en: string
  }
  slug: string
  parentId: string,
  level: number,
  icon: string,
  isActive: boolean,
  filterGroups: IAttributeCategory[]
}


