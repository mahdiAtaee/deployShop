import { NextFunction, Request, Response } from "express";
import Category from "../model/Category";
import IRepository from "../../contracts/IRepository";
import ICategory from "../model/ICategory";
import CategoryMongoRepository from "../repositories/CategoryMongoRepository";
import ICategoryRepository from "../repositories/ICategoryRepository";
import CategoryTransformer from "./CategoryTransformer";
import ITransformer from "../../contracts/ITransformer";
import NotFoundException from "../../exceptions/NotFoundException";
import { v4 as uuid } from 'uuid'

class CategoryController {
  private readonly categoryRepository: ICategoryRepository
  private readonly categoryTransformer: ITransformer<ICategory>
  constructor() {
    this.categoryRepository = new CategoryMongoRepository()
    this.categoryTransformer = new CategoryTransformer()
    this.parentList = this.parentList.bind(this)
    this.list = this.list.bind(this)
  }

  public async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        ...req.body,
        hash: uuid()
      }
      
      const newCategory = await Category.create({ ...req.body });
      return res.send({ success: true, newCategory });
    } catch (error) {
      next(error)
    }
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await Category.find();
      return res.send({
        success: true,
        categories: this.categoryTransformer.collection(categories)
      });
    } catch (error) {
      next(error)
    }
  }

  public async attributes(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryID = req.params.id;
      const category = await Category.findById(categoryID);
      if (!category) {
        throw new NotFoundException("دسته بندی مورد نظر یافت نشد")
      }
      res.send(
        category.filterGroups.map((group) => {
          return {
            hash: group.hash,
            name: group.name,
            attributes: group.filters,
          };
        })
      );

    } catch (error) {
      next(error)
    }
  }

  public async parentList(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryLevel = req.query.level
      const categories = await this.categoryRepository.findByLevel(categoryLevel as string)
      res.send({
        success: true,
        categories
      })
    } catch (error) {
      next(error)
    }
  }
}

export default CategoryController;
