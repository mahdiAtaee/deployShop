import IRepository from "src/components/contracts/IRepository";
import ProductStatus from "../model/productStatus";
import IProducts from "../model/IProduct";

export default interface IProductRepository extends IRepository<IProducts> {
  findByStatus(status: ProductStatus): Promise<IProducts[]>;
}
