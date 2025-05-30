import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path = require("path");
import IProductRepository from "../repositories/IProductRepository";
import ProductMongoRepository from "../repositories/ProductMongoRepository";
import UploadService from "../../../services/UploadService";
import ProductTransformer from "./Transformer";

class Controller {
  private productRepository: IProductRepository;
  private uploadService: UploadService;
  private productTransformer: ProductTransformer;
  constructor() {
    this.productRepository = new ProductMongoRepository();
    this.uploadService = new UploadService();
    this.productTransformer = new ProductTransformer();
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
  }

  public async index(req: Request, res: Response) {
    const allproducts = await this.productRepository.findMany({});
    res.send(this.productTransformer.collection(allproducts));
  }

  public async create(req: Request, res: Response) {
    const productData = {
      title: req.body.title,
      price: req.body.price,
      discountedPrice: req.body.discountedPrice,
      stock: req.body.stock,
      category: req.body.category,
      variation: JSON.parse(req.body.variation),
      priceVariation: JSON.parse(req.body.priceVariation),
      description: req.body.description,
      attributes: req.body.attributes ? JSON.parse(req.body.attributes) : [],
      gallery: req.body.gallery,
      thumbnail: req.body.thumbnail
    };
    const newProduct = await this.productRepository.create(productData);
    // if (req.files) {
    //   const thumbnail: UploadedFile = req.files?.thumbnail as UploadedFile;
    //   const thumbnailName: string = await this.uploadService.upload(thumbnail);
    //   const gallery: UploadedFile[] = req.files.gallery as UploadedFile[];
    //   const galleryName: string[] = await this.uploadService.uploadMany(
    //     gallery
    //   );
    //   await this.productRepository.updateOne(
    //     { _id: newProduct._id },
    //     {
    //       thumbnail: thumbnailName,
    //       gallery: galleryName,
    //     }
    //   );
    // }
    res.send({ newProduct });
  }
}

export default Controller;
