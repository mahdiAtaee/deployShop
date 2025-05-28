import { model, Schema } from "mongoose";
import IProducts from "./IProduct";
import ProductStatus from "./productStatus";



const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  purchase_count: { type: Number, default: 0 },
  comments_count: { type: Number, default: 0 },
  total_score: { type: String, default: "0" },
  views_count: { type: Number, default: 0 },
  discountedPrice: { type: Number, default: 0 },
  thumbnail: { type: String },
  gallery: { type: [String] },
  category: { type: Schema.Types.ObjectId, ref: "Categories" },
  //attributes: { type: [Object], required: true },
  attributes: [{
    filterGroupId: { type: String }, // ارجاع به گروه فیلتر
    filterKey: { type: String, required: true }, // مطابق با key در مدل دسته‌بندی
    value: {
      type: Schema.Types.Mixed, // می‌تواند رشته، عدد، آرایه یا بولین باشد
      required: true
    },
    displayValue: { // مقدار نمایشی (برای مواردی که نیاز به نمایش متفاوت دارد)
      fa: { type: String },
      en: { type: String }
    }
  }],
  description: { type: String },
  variation: { type: [Object] },
  priceVariation: { type: [Object] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  status: { type: String, enum: ProductStatus, default: ProductStatus.INIT },
});

// ProductSchema.virtual('thumbnailUrl').get(function (this: IProducts) {
//   return `${process.env.APP_URL}/contents/${this.thumbnail}`
// })


// ProductSchema.virtual('galleryUrl').get(function (this: IProducts) {
//   return this.gallery?.map((item: string) => {
//     return `${process.env.APP_URL}/contents/${item}`
//   })
// })

export default model<IProducts>("Product", ProductSchema);
