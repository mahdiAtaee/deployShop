import IRepository from "../../contracts/IRepository";
import ICategory from "../model/ICategory";

export default interface ICategoryRepository extends IRepository<ICategory> {
    findBySlug(slug: string): Promise<ICategory | null>
    findByLevel(level: string): Promise<ICategory[] | null>
}