import { Router } from "express";
import Controller from "./Controller";
const ControllerInstance = new Controller();
const router: Router = Router();

router.get("/", ControllerInstance.index);
router.post("/", ControllerInstance.create);

export default router