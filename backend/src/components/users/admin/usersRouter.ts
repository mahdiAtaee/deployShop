import { Router } from "express";
import UsersController from "./usersController";
const UsersControllerInstance = new UsersController();
const usersRouter: Router = Router();

usersRouter.get("/", UsersControllerInstance.index);
usersRouter.post("/", UsersControllerInstance.create);

export default usersRouter