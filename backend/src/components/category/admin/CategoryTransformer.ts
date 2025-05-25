import ITransformer from "src/components/contracts/ITransformer";
import ICategory from "../model/ICategory";



class CategoryTransformer implements ITransformer<ICategory> {
    constructor() { }
    transform(item: ICategory) {
        return {
            id: item._id,
            name: item.name,
            slug: item.slug,
            isActive: item.isActive,
        }
    }
    collection(items: ICategory[]) {
        return items.map((item: ICategory) => this.transform(item))
    }

}

export default CategoryTransformer