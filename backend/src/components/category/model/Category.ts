import { model, Schema } from "mongoose";
import ICategory from "./ICategory";
import FilterValueEnum from "./FilterValueEnum";

// const CategorySchema: Schema = new Schema({
//   title: { type: String, required: true },
//   slug: { type: String, require: true },
//   groups: { type: [Object] },
// });


const categorySchema: Schema = new Schema({
  name: {
    FA: { type: String, required: true },
    EN: { type: String }
  },
  slug: { type: String, required: true, unique: true },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null // null برای دسته‌های اصلی
  },
  level: { type: Number, default: 1 },
  icon: { type: String },
  isActive: { type: Boolean, default: true },
  filterGroups: [ // گروه‌های فیلتر
    {
      name: { type: String, required: true },
      hash: { type: String },
      slug: { type: String, required: true }, // شناسه منحصر به فرد گروه
      filters: [ // فیلترهای این گروه
        {
          name: {
            fa: { type: String, required: true },
            en: { type: String }
          },
          slug: { type: String, required: true }, // شناسه فیلتر
          type: {
            type: String,
            enum: FilterValueEnum,
            required: true
          },
          values: { type: [] }, // مقادیر پیش‌فرض
          filterable: { type: Boolean, default: true },
          hasPrice: { type: Boolean, default: false }
        }
      ]
    }
  ]
}, { timestamps: true });

categorySchema.pre('save', async function (next) {
  const Category = model('Categories');
  if (this.parentId) {
    const parent = await Category.findById(this.parentId);
    this.level = parent ? parent.level + 1 : 1;
  } else {
    this.level = 1;
  }
  next();
});

categorySchema.virtual('iconUrl').get(function (this: ICategory) {
  return `${process.env.APP_URL}/contents/${this.icon}`
})

// ایندکس‌های مهم
categorySchema.index({ parentId: 1, isActive: 1 });
categorySchema.index({ slug: 1 }, { unique: true });

categorySchema.set("toJSON", {
  virtuals: true,
});


export default model<ICategory>("Categories", categorySchema);
