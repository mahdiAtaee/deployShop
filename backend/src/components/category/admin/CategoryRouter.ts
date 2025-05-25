import { Router } from "express";
import CategoryController from "./CategoryController";
const CategoryControllerInstance = new CategoryController();
const CategoryRouter: Router = Router();

CategoryRouter.post("/", CategoryControllerInstance.store);
CategoryRouter.get("/", CategoryControllerInstance.list);
CategoryRouter.get("/:level", CategoryControllerInstance.parentList);
CategoryRouter.get("/:id/attributes", CategoryControllerInstance.attributes);

export default CategoryRouter;
